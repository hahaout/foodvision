from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import torch
from PIL import Image
from .model_loader import EffnetB2  # Your model loading function
from backend.settings import BASE_DIR
import os


@csrf_exempt  # For testing only - remove in production!
def predict(request):
    if request.method == 'POST':
        return JsonResponse({'error': 'Only POST requests allowed'}, status=400)
    
    # Check if image was uploaded
    #if 'image' not in request.FILES:
    #    return JsonResponse({'error': 'No image provided'}, status=400)
    
    try:
        # Load model (or use your ModelService)
        model = EffnetB2()
        if model is None:
            return JsonResponse({'error': 'Model not loaded'}, status=500)
        
        # Process image
        image_file = os.path.join(BASE_DIR,"ai_models/test_images/592799.jpg")
        img_tensor = model.transform(Image.open(image_file)).unsqueeze(0)   
        # Make prediction
        model.effnetb2.eval()
        with torch.no_grad():
            output = model.effnetb2(img_tensor)
            probabilities = torch.nn.functional.softmax(output[0], dim=0)
    
        # Return results (customize with your class names)
        return JsonResponse({
            'success': True,
            'predictions': probabilities.tolist(),
            'classes': ['pizza', 'steak', 'sushi']  # Update with your class names
        }, status = 200)
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)