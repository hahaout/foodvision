
from django.shortcuts import get_object_or_404
# Create your views here.
from django.http import Http404, JsonResponse
from .models import *
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json

# Helper Function
def prob_assertion(prob: float):
    if prob>=0.5:
        return "Success"
    return "Fail"


def index(request):
    try:
        history_objects = History_Summary.objects.all()
        output = [] 
        for item in history_objects:
            data = {
                "id": item.pk,
                "date" : item.date.strftime("%Y-%m-%d %H:%M:%S"),
                "model" : item.model,
                "prediction" : item.prediction,
                "probability" : item.probability,
                "result" : prob_assertion(item.probability)
            }
            output.append(data)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    # Return as JSON responsev  
    return JsonResponse({'data' : output})

def history_detail(request, pk):
    try:
        summary = get_object_or_404(History_Summary, pk=pk)
        
        if not summary.Prediction:
            raise History_Summary.DoesNotExist

        # Get related predictions
        predictions =  History_Prediction.objects.get(pk=summary.Prediction.pk)
        food = predictions.prediction.all() # type: ignore

        data = {
            "meta_data": {
                "id": predictions.pk,
                "date": predictions.date.strftime("%Y-%m-%d %H:%M:%S"),
                "model": predictions.model,
            },
            "detailed_predictions": [
                {
                    "food": pred.food,
                    "probability": float(pred.probability)
                } for pred in food
            ]
        }
        
        return JsonResponse(data)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_POST
def save_data(request):
    # Check for file existence
    if "prediction_data" not in request.FILES:
        return JsonResponse({'error': 'Prediction data file is missing'}, status=400)
    
    try:
        # Read and parse JSON data
        file = request.FILES['prediction_data']
        try:
            json_data = json.loads(file.read().decode('utf-8'))
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        
        # Validate required fields
        if not all(key in json_data for key in ['model', 'predictions']):
            return JsonResponse({'error': 'Missing required fields in JSON'}, status=400)
        
        if not isinstance(json_data['predictions'], list) or len(json_data['predictions']) == 0:
            return JsonResponse({'error': 'Predictions must be a non-empty array'}, status=400)
        
        # Create history prediction
        new_history = History_Prediction.objects.create(
            date=datetime.now(),
            model=json_data['model']
        )
        
        # Create food predictions
        for item in json_data['predictions']:
            if not all(key in item for key in ['food', 'probability']):
                new_history.delete()  # Rollback if invalid
                return JsonResponse({'error': 'Prediction item missing required fields'}, status=400)
            
            Prediction_Food.objects.create(
                food=item['food'],
                probability=float(item['probability']),
                prediction_History=new_history
            )
        
        # Create summary
        History_Summary.objects.create(
            Prediction=new_history,
            date=datetime.now(),
            model=json_data['model'],
            prediction=json_data['predictions'][0]['food'],
            probability=float(json_data['predictions'][0]['probability'])
        )
        
        return JsonResponse({'success': True, 'history_id': new_history.pk})
    
    except Exception as e:
        return JsonResponse({'error': f'Server error: {str(e)}'}, status=500)