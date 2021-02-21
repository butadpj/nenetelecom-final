from django.shortcuts import render
from django.http import JsonResponse
import json

from backend.cart.models import *
from backend.store.models import *
from backend.checkout.models import *
# Create your views here.
def index(request):
    return render(request, 'REACT/main/index.html')


def process_order(request):
    data = json.loads(request.body)
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False, confirmed=False, paid=False)
    else:
        first_name = data['customerInfo']['firstName']
        last_name = data['customerInfo']['lastName']
        mobile_number = data['customerInfo']['mobileNumber']

    total = float(data['total'])
    
    if total == order.total_cart_price:
        order.complete = True

    Shipping.objects.create( 
            customer = customer,
            order = order,
            address = data['shippingInfo']['address'],
            city = data['shippingInfo']['city'],
            province = data['shippingInfo']['province'],
            zip_code = data['shippingInfo']['zipCode'],
        )
        
    order.save()

    return JsonResponse(data, safe=False)