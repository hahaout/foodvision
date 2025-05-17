from django.shortcuts import render
import json
# Create your views here.
from django.http import Http404, JsonResponse
from .models import History

# Helper Function
def prob_assertion(prob: float):
    if prob>=0.5:
        return "Success"
    return "Fail"


def index(request):
    try:
        history_objects = History.objects.all()
        output = [] 
        for item in history_objects:
            data = {
                "id": item.pk,
                "date" : item.date.strftime("%Y-%m-%d %H:%M:%S"),
                "model" : item.model,
                "prediction" : item.prediction,
                "probrability" : item.probrability,
                "result" : prob_assertion(item.probrability)
            }
            output.append(data)
    except History.DoesNotExist:
        raise Http404("Question does not exist")
    # Return as JSON responsev  
    return JsonResponse({'data' : output})