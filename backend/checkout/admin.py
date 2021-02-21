from django.contrib import admin
from .models import Shipping

# Register your models here.
class ShippingAdmin(admin.ModelAdmin):
    list_display = ['info', 'delivered', 'ready_to_deliver']


admin.site.register(Shipping, ShippingAdmin)