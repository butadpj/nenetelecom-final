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

    first_name = data['customerInfo']['firstName']
    last_name = data['customerInfo']['lastName']
    mobile_number = data['customerInfo']['mobileNumber']

    address = data['shippingInfo']['address']
    city = data['shippingInfo']['city']
    province = data['shippingInfo']['province']
    zip_code = data['shippingInfo']['zipCode']
    shipping_address = (f'{address}, {city}, {province}, {zip_code}')

    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False, confirmed=False, paid=False)
    else:
        cart = json.loads(request.COOKIES['cart'])

        cart_items = []
        order = {'total_cart_price': 0, 'total_cart_items': 0}

        total_price = 0
        total_count = 0
        
        for i in cart:

            # total_count & total_price in cart
            total_count += cart[i]['quantity']
            total_price += cart[i]['total_price']

            # Cart or the cart items in a whole
            order['total_cart_price'] += total_price
            order['total_cart_items'] += total_count


            # Order_Product Object
            product = Product.objects.get(id=i)
            item = {
                'product': {
                    'id': product.id,
                },
                'quantity': cart[i]['quantity'],
                'total_price': total_price
            }

            cart_items.append(item)

        customer, created = Customer.objects.get_or_create(mobile_number = mobile_number)
        customer.first_name = first_name
        customer.last_name = last_name
        customer.full_address = shipping_address
        customer.save()

        order = Order.objects.create(
            customer = customer,
        )

        for item in cart_items:
            product = Product.objects.get(id=item['product']['id'])

            order_product = OrderProduct.objects.create(
                order = order,
                product = product,
                quantity = item['quantity']
            )

        
    total = float(data['total'])
    
    if total == order.total_cart_price:
        order.complete = True

    Shipping.objects.create( 
            customer = customer,
            order = order,
            address = address,
            city = city,
            province = province,
            zip_code = zip_code,
        )
        
    order.save()

    return JsonResponse(data, safe=False)