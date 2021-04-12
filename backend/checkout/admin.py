from django.contrib import admin
from .models import Order, OrderProduct

# Register your models here.
class OrderAdmin(admin.ModelAdmin):
    list_display = ['transaction_id', 'info',  'total_cart_items', 'total_cart_price', 'confirmed', 'paid', 'delivered', 'ready_to_deliver', 'date_placed']
    readonly_fields = ('customer', 'address', 'city', 'province', 'zip_code')


class OrderProductAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'quantity', 'total_price', 'storage_variation_name', 'color_variation_name', 'variation_price']
    readonly_fields=('order', 'product', 'quantity')

admin.site.register(Order, OrderAdmin)
admin.site.register(OrderProduct, OrderProductAdmin)