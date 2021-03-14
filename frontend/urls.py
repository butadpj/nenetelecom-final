from django.urls import path
from . import views
from django.views.generic import TemplateView



urlpatterns = [
    path('', views.index),
    path('process_order/', views.process_order, name='process_order'),
    path('offline.html', (TemplateView.as_view(template_name="REACT/main/offline.html", 
    content_type='text/html', )), name='offline.html'),
    path('service-worker.js', (TemplateView.as_view(template_name="REACT/main/service-worker.js", 
    content_type='application/javascript', )), name='service-worker.js'),
]