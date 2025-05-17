from django.db import models

# Create your models here.

class History(models.Model):
    date = models.DateTimeField(auto_now=True)
    model = models.CharField(max_length=20)
    prediction = models.CharField(max_length=20)
    probrability = models.FloatField(default=0)
