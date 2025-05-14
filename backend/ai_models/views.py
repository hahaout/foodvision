import torch
from PIL import Image
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .model_loader import EffnetB2
import io

from .apps import ai_model

@csrf_exempt  # Remember to remove in production
def predict(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests allowed'}, status=400)
    
    try:
        # Check if file was uploaded
        if 'image' not in request.FILES:
            return JsonResponse({'error': 'No image file provided'}, status=400)
        
        image_file = request.FILES['image']
        
        # Load model
        model = ai_model
        if model is None:
            return JsonResponse({'error': 'Model not loaded'}, status=500)
        
        # Process image directly from uploaded file
        try:
            # Read file content into memory
            image_bytes = image_file.read()
            
            # Create PIL Image from bytes
            img = Image.open(io.BytesIO(image_bytes))
            
            # Convert to tensor
            img_tensor = model.transform(img).unsqueeze(0)
        except Exception as e:
            return JsonResponse({'error': f'Image processing failed: {str(e)}'}, status=400)
        
        # Make prediction
        try:
            model.effnetb2.eval()
            with torch.no_grad():
                output = model.effnetb2(img_tensor)
                probabilities = torch.nn.functional.softmax(output[0], dim=0)
        except Exception as e:
            return JsonResponse({'error': f'Prediction failed: {str(e)}'}, status=500)
        
        return JsonResponse({
            'success': True,
            'predictions': probabilities.tolist(),
            'classes': ['pizza', 'steak', 'sushi']
        }, status=200)
        
    except Exception as e:
        return JsonResponse({'error': f'Unexpected error: {str(e)}'}, status=500)