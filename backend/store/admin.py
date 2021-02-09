from django.contrib import admin
from .models import *

# Register your models here.

class ProductImageAdmin(admin.StackedInline):
    model = ProductImage

class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageAdmin]

    list_display = ['id', 'brand', 'name', 'date_posted']

class ProductImageAdmin(admin.ModelAdmin):
    pass

class CustomerAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'mobile_number', 'user']

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage, ProductImageAdmin)
admin.site.register(Customer, CustomerAdmin)

