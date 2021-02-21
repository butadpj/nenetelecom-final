from django.db import models
from backend.store.models import Customer, Product
import uuid

# Create your models here.
class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
    transaction_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    transaction_date = models.DateTimeField(null=True, auto_now_add=True)
    confirmed = models.BooleanField(default=False, null=False, blank=False)
    paid = models.BooleanField(default=False, null=False, blank=False)

    def __str__(self):
        return str(self.transaction_id)  

    @property
    def total_cart_price(self):
        order_product = self.orderproduct_set.all().filter(selected=True)
        total = sum([item.total_price for item in order_product])
        return total


    @property
    def total_cart_items(self):
        orderproduct = self.orderproduct_set.all()
        total = sum([item.quantity for item in orderproduct])
        return total


    @property
    def customer_info(self):
        try:
            return (f'{self.customer.first_name}: {self.customer.mobile_number}')
        except:
            pass


class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, blank=True, null=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    selected = models.BooleanField(default=True, null=False, blank=False)

    def __str__(self):
        return str(self.id)

    @property
    def total_price(self):
        return self.product.price * self.quantity

