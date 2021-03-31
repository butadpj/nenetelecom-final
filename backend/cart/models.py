from django.db import models
from django.utils import timezone
from backend.store.models import Customer, Product
import uuid

# Create your models here.
class Bag(models.Model):
    class Meta:
        ordering = ('-created_at', )

    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
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
    bag = models.ForeignKey(Bag, on_delete=models.CASCADE, blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, blank=True, null=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    selected = models.BooleanField(default=True, null=False, blank=False)

    # def save(self):
    #     obj = Bag.objects.get(id=self.bag.id)
    #     super().save()
    #     super(type(obj), obj).save()

    def __str__(self):
        return str(self.id)

    
    @property
    def total_price(self):
        try:
            return self.product.price * self.quantity
        except:
            pass