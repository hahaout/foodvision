from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('details/<int:pk>', views.history_detail, name='history-detail'),
    path("save-data", views.save_data, name='history-save'),
    path("delete/<int:pk>", views.delete_data, name='delete-data')
]