from django.contrib import admin
from .models import *

# Register your models here.
class OrderAdmin(admin.ModelAdmin):
    list_display = [ 'customer_info', 'complete', 'confirmed', 'total_cart_items', 'total_cart_price', 'created_at', 'modified']
    readonly_fields=('transaction_id', 'customer', 'complete',)


class OrderProductAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'quantity', 'total_price']
    readonly_fields=('order', 'product', 'quantity', 'selected')


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderProduct, OrderProductAdmin)