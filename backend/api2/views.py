from django.shortcuts import render, get_object_or_404

from rest_framework.viewsets import ModelViewSet
from django_auto_prefetching import AutoPrefetchViewSetMixin
import django_auto_prefetching
from backend.store.models import *
from backend.cart.models import *
from backend.checkout.models import *
from .serializers import *
from .paginations import *


# Create your views here.
class ProductView(AutoPrefetchViewSetMixin, ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = ProductPagination

    def get_queryset(self):
        # Simply do the extra select_related / prefetch_related here
        # and leave the mixin to do the rest of the work
        queryset = Product.objects.all()
        queryset = queryset.select_related()
        return django_auto_prefetching.prefetch(queryset, self.serializer_class)


class ProductImageView(AutoPrefetchViewSetMixin, ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer

class ProductVariationView(ModelViewSet):
    queryset = ProductVariation.objects.all()
    serializer_class = ProductVariationSerializer

class CustomerView(ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class BagView(ModelViewSet):
    queryset = Bag.objects.all()
    serializer_class = BagSerializer

class BagItemView(ModelViewSet):
    queryset = BagItem.objects.all()
    serializer_class = BagItemSerializer

class OrderView(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderProductView(ModelViewSet):
    queryset = OrderProduct.objects.all()
    serializer_class = OrderProductSerializer
