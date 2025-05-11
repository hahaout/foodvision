from django.db import models

# Create the AI agent
class AIModel(models.Model):
    name = models.CharField(max_length=100)
    version = models.CharField(max_length=50)
    architecture = models.JSONField()  # Stores model config
    accuracy = models.FloatField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} v{self.version}"