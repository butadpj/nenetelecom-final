from django.db import models
from backend.store.models import Customer, Product
from backend.cart.models import Bag
import uuid

# Create your models here.
class Order(models.Model):
    class Meta:
        ordering = ('-date_placed', )

    transaction_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, blank=True, null=True)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    province = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=10)
    date_placed = models.DateTimeField(auto_now_add=True)
    confirmed = models.BooleanField(default=False, null=False, blank=False)
    paid = models.BooleanField(default=False, null=False, blank=False)
    delivered = models.BooleanField(default=False, null=False, blank=True)

    @property
    def total_cart_price(self):
        try:
            order_product = self.orderproduct_set.all()
            total = sum([item.total_price for item in order_product])
            return total
        except:
            pass

    @property
    def total_cart_items(self):
        order_product = self.orderproduct_set.all()
        total = sum([item.quantity for item in order_product])
        return total

    @property
    def ready_to_deliver(self):
        ready = 'No'
        try:
            if self.confirmed == True:
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


class OrderProduct(models.Model):

    order = models.ForeignKey(Order, on_delete=models.CASCADE, blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, blank=True, null=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)

    storage_variation_name = models.CharField(max_length=20, null=True, blank=True)
    color_variation_name = models.CharField(max_length=20, null=True, blank=True)
    variation_price = models.DecimalField(max_digits=10, null=True, blank=True, decimal_places=2)

    @property
    def total_price(self):
        try:
            if self.variation_price:
                return self.variation_price * self.quantity
            return self.product.price * self.quantity
        except:
            pass