from django.contrib import admin
from .models import Shipping

# Register your models here.
class ShippingAdmin(admin.ModelAdmin):
    list_display = ['shipping_address', 'customer_info', 'delivered', 'ready_to_deliver']
    readonly_fields = ('customer', 'order', 'address', 'city', 'province', 'zip_code')


admin.site.register(Shipping, ShippingAdmin)