from django.db import models
from django.utils import timezone
from backend.store.models import Customer, Product
import uuid

# Create your models here.
class Bag(models.Model):
    class Meta:
        ordering = ('-created_at', )

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, blank=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(null=True, auto_now_add=True)
    modified = models.DateTimeField(null=True, auto_now=True)
    # complete = models.BooleanField(default=False, null=False, blank=False)
    # confirmed = models.BooleanField(default=False, null=False, blank=False)
    # paid = models.BooleanField(default=False, null=False, blank=False)

    def __str__(self):
        return str(self.id)  

    @property
    def total_cart_price(self):
        try:
            bag_item = self.bagitem_set.all().filter(selected=True)
            total = sum([item.total_price for item in bag_item])
            self.save()
            return total
        except:
            pass
        


    @property
    def total_cart_items(self):
        bag_item = self.bagitem_set.all()
        total = sum([item.quantity for item in bag_item])
        self.save()
        return total


    @property
    def customer_info(self):
        return (f'{self.customer}')
    

class BagItem(models.Model):
    S = 'Storage Size'
    C = 'Color Family'

    CATEGORY = (
        (S, 'Storage Size'),
        (C, 'Color Family'),
    )  

    bag = models.ForeignKey(Bag, on_delete=models.CASCADE, blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    selected = models.BooleanField(default=True, null=False, blank=False)

    variation_category = models.CharField(max_length=30, null=False, blank=True, choices=CATEGORY, default=CATEGORY[0][0])
    variation_name = models.CharField(max_length=20, null=False, blank=True)
    variation_price = models.DecimalField(max_digits=10, null=True, blank=True, decimal_places=2)

    def __str__(self):
        return str(self.id)

    
    @property
    def total_price(self):
        try:
            if self.variation_price:
                return self.variation_price * self.quantity
            return self.product.price * self.quantity
        except:
            pass
