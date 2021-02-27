from rest_framework import serializers
from backend.store.models import *
from backend.cart.models import *
from backend.checkout.models import *

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        
        # to get all fields and put it into single array
        fields = [field.name for field in model._meta.fields] 
        fields.insert(0, 'url') # push url field in index 0

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        # to get all fields and put it into single array
        fields = [field.name for field in model._meta.fields] 
        fields.insert(0, 'url') # push url field in index 0


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        # to get all fields and put it into single array
        fields = [field.name for field in model._meta.fields] 
        fields.insert(0, 'url') # push url field in index 0
        fields.insert(3, 'au_mobile_number')
        fields.insert(4, 'au_first_name')
        fields.insert(5, 'au_last_name')
        fields.insert(6, 'au_complete_address')

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        # to get all fields and put it into single array
        fields = [field.name for field in model._meta.fields] 
        fields.insert(0, 'url') # push url field in index 0
        fields.insert(5, 'total_cart_items')
        fields.insert(6, 'total_cart_price')
        
    
class OrderProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProduct
        # to get all fields and put it into single array
        fields = [field.name for field in model._meta.fields] 
        fields.insert(0, 'url') # push url field in index 0
        fields.insert(5, 'total_price')

class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipping
        # to get all fields and put it into single array
        fields = [field.name for field in model._meta.fields] 
        fields.insert(0, 'url') # push url field in index 0
        fields.insert(10, 'ready_to_deliver')
        fields.insert(11, 'shipping_address')