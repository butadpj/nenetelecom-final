from django.db import models
from backend.store.models import Customer
from backend.cart.models import Order

# Create your models here.
class Shipping(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, blank=True, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, blank=True, null=True)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    province = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=10)
    date_placed = models.DateTimeField(auto_now_add=True)
    delivered = models.BooleanField(default=False, null=False, blank=True)

    @property
    def ready_to_deliver(self):
        ready = 'No'
        try:
            if self.order.confirmed == True:
                ready = 'Yes'
                
            return ready
        except:
            pass

    @property
    def shipping_address(self):
        return (f'{self.address}, {self.city} City, {self.province}, {self.zip_code}')

    @property
    def customer_info(self):
        return self.customer

    @property
    def info(self):
        return (f'{self.customer}: {self.shipping_address}')

    def __str__(self):
        return self.info