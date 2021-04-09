from django.contrib import admin
from .models import *

# Register your models here.

class ProductImageAdmin(admin.StackedInline):
    model = ProductImage

class ProductVariationAdmin(admin.StackedInline):
    model = ProductVariation
    
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageAdmin, ProductVariationAdmin]

    list_display = ['id', 'brand', 'name', 'date_posted', ]

class ProductImageAdmin(admin.ModelAdmin):
    readonly_fields = ('product', 'image', )

class ProductVariationAdmin(admin.ModelAdmin):
    readonly_fields = ('product', 'name', )

class CustomerAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer_info', 'user']

    readonly_fields=('au_first_name', 'au_last_name', 'au_mobile_number', 'au_complete_address',)

admin.site.register(Product, ProductAdmin)
admin.site.register(Customer, CustomerAdmin)

