# ai_models/urls.py
from django.urls import path
from . import views  # Make sure you have a views.py in your ai_models app

urlpatterns = [
    path('predict/', views.predict, name='predict'),
    # Add other URL patterns as needed
]