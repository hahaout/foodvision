
from django.shortcuts import get_object_or_404
# Create your views here.
from django.http import Http404, JsonResponse
from .models import *

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
