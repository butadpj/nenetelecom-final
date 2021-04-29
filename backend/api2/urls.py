from django.urls import path, include
from rest_framework import routers
from . import views

#? CLASS BASED VIEWS --------
router = routers.DefaultRouter()
router.register('products', views.ProductView)
router.register('product-image', views.ProductImageView)
# router.register('product-variation', views.ProductVariationView)
# router.register('customers', views.CustomerView)
# router.register('bags', views.BagView)
# router.register('bag-item', views.BagItemView)
# router.register('orders', views.OrderView)
# router.register('order-product', views.OrderProductView)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls', namespace="auth_v2"))
]