from django.contrib import admin
from .models import *

# Register your models here.
class BagAdmin(admin.ModelAdmin):
    list_display = [ 'customer_info', 'total_cart_items', 'total_cart_price', 'created_at', 'modified']
    readonly_fields=('id', 'customer',)


class BagItemAdmin(admin.ModelAdmin):
    list_display = ['bag', 'product', 'quantity', 'total_price', 'variation_category', 'variation_name', 'variation_price',]
    readonly_fields=('bag', 'product', 'quantity', 'selected')


admin.site.register(Bag, BagAdmin)
admin.site.register(BagItem, BagItemAdmin)