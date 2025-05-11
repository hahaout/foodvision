from django.apps import AppConfig

class AiModelsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ai_models'
    
    def ready(self):
        # Import and load model only when app is fully loaded
        from .model_loader import EffnetB2
        global ai_model
        ai_model = EffnetB2()