from django.shortcuts import render

# Create your views here.
from django.http import Http404, JsonResponse
from .models import History

def index(request, id):
    try:
        history_objects = History.objects.get(pk=id) 
        
    except History.DoesNotExist:
        raise Http404("Question does not exist")
    # Return as JSON responsev  
    return JsonResponse(history_objects.predictions, safe=False)