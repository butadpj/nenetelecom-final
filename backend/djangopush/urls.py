from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('send_push/', views.send_push),
]