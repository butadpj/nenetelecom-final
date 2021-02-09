from django.contrib import admin
from .models import *

# Register your models here.
class OrderAdmin(admin.ModelAdmin):
    list_display = ['transaction_id', 'confirmed', 'transaction_date', 'customer_info', 'total_cart_price', 'total_cart_items']

class OrderProductAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'quantity', 'total_price']

admin.site.register(Order, OrderAdmin)
admin.site.register(OrderProduct, OrderProductAdmin)