from django.shortcuts import render

from rest_framework import viewsets, permissions

from backend.store.models import *
from backend.cart.models import *
from backend.checkout.models import *
from .serializers import *



# Create your views here.
class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductImageView(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer

class CustomerView(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class BagView(viewsets.ModelViewSet):
    queryset = Bag.objects.all()
    serializer_class = BagSerializer

class BagItemView(viewsets.ModelViewSet):
    queryset = BagItem.objects.all()
    serializer_class = BagItemSerializer

class OrderView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderProductView(viewsets.ModelViewSet):
    queryset = OrderProduct.objects.all()
    serializer_class = OrderProductSerializer
