"""nenetelecom URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('backend.api.urls')),
    path('', include('frontend.urls')),
    path('store/', include('frontend.urls')),
    path('store/home/accounts/', include('backend.accounts.urls')),
    path('store/accounts/', include('backend.accounts.urls')),
    path('store/home/', include('frontend.urls')),
    path('store/cart/', include('frontend.urls')),
    path('store/checkout/', include('frontend.urls')),
    path('store/checkout/process_order/', include('frontend.urls')),
    path('store/orders/', include('frontend.urls')),
    path('offline.html', (TemplateView.as_view(template_name="REACT/main/offline.html", 
        content_type='text/html', )), name='offline.html'),
    path('service-worker.js', (TemplateView.as_view(template_name="service-worker.js", 
        content_type='application/javascript', )), name='service-worker.js'),
]

admin.site.site_header = 'Nenetelecom Administration'                    # default: "Django Administration"
admin.site.index_title = 'Nenetelecom'                 # default: "Site administration"
admin.site.site_title = 'Admin Panel' # default: "Django site admin"

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
