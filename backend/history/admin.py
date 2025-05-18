from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(History_Prediction)
admin.site.register(History_Summary)
admin.site.register(Prediction_Food)