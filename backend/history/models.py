from django.db import models

# Create your models here.

class History(models.Model):
    uid = models.CharField(max_length=10)

    predictions = models.JSONField()
