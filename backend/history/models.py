from django.db import models

class History_Prediction(models.Model):
    """Stores complete prediction session details (One-to-Many with Prediction)"""
    date = models.DateTimeField(auto_now_add=True)
    model = models.CharField(max_length=20)
    # image = models.ImageField(upload_to='predictions/', null=True, blank=True)

class Prediction_Food(models.Model):
    """Stores individual food prediction probabilities"""
    food = models.CharField(max_length=20)
    probability = models.FloatField(default=0)
    prediction_History = models.ForeignKey( 
        History_Prediction,
        on_delete=models.CASCADE,
        related_name='prediction'
        )
        
    class Meta:
        ordering = ['-probability']  # Highest probability firstp

class History_Summary(models.Model):
    """Stores summarized history (One-to-Many with PredictionSession)"""
    Prediction = models.ForeignKey(
        History_Prediction,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='history_records'
    )
    date = models.DateTimeField(auto_now_add=True)
    model = models.CharField(max_length=20)
    prediction = models.CharField(max_length=20)
    probability = models.FloatField()
    
    class Meta:
        verbose_name_plural = "Histories"
        ordering = ['-date']
        
    def __str__(self):
        return f"{self.model} predicted {self.prediction} at {self.date}"