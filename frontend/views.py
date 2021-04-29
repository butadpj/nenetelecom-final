from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json

from backend.cart.models import *
from backend.store.models import *
from backend.checkout.models import *

# Create your views here.
def index(request):
    return render(request, 'REACT/main/index.html')

@require_POST
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

    total = float(data['total'])

    cart_items = []
    
    # If User is logged in
    if request.user.is_authenticated:
        customer = request.user.customer
        bag = Bag.objects.get(customer=request.user.customer.id)
        cart = bag.bagitem_set.all()
        
        total_price = 0

        for i in cart:
            if i.selected:
                total_price += float(i.total_price)

                product = Product.objects.get(id=i.product.id)
                item = {
                    'product': {
                        'id': product.id,
                    },
                    'quantity': i.quantity,
                    'total_price': total_price,
                    'storage_variation_name': i.storage_variation_name,
                    'color_variation_name': i.color_variation_name,
                    'variation_price': i.variation_price,

                }

                cart_items.append(item)

        if total == total_price:
            # Create the Order
            order = Order.objects.create(
                customer = customer,
                address = address,
                city = city,
                province = province,
                zip_code = zip_code,
            )

            # Create the Order Product
            for item in cart_items:
                product = Product.objects.get(id=item['product']['id'])
                order_product = OrderProduct.objects.create(
                    order = order,
                    product = product,
                    quantity = item['quantity'],
                    storage_variation_name = item['storage_variation_name'],
                    color_variation_name = item['color_variation_name'],
                    variation_price = item['variation_price'],
                )

    # If User is Guest
    else:
        cart = json.loads(request.COOKIES['cart'])

        total_price = 0
        
        for i in cart:
            # Only get the selected product in checkout
            if cart[i]['selected']:

                # Total price of each selected product
                total_price += float(cart[i]['total_price'])

                # Order_Product Object
                product = Product.objects.get(id=i)
                item = {
                    'product': {
                        'id': product.id,
                    },
                    'quantity': cart[i]['quantity'],
                    'total_price': total_price,
                    'storage_variation_name': cart[i]['storage_variation_name'],
                    'color_variation_name': cart[i]['color_variation_name'],
                    'variation_price': cart[i]['variation_price'],
                }

                cart_items.append(item)

        customer, created = Customer.objects.get_or_create(mobile_number = mobile_number)
        customer.first_name = first_name
        customer.last_name = last_name
        customer.full_address = shipping_address
        customer.save()

        if total == total_price:
            # Create the Order
            order = Order.objects.create(
                customer = customer,
                address = address,
                city = city,
                province = province,
                zip_code = zip_code,
            )

            # Create the Order Product
            for item in cart_items:
                product = Product.objects.get(id=item['product']['id'])
                order_product = OrderProduct.objects.create(
                    order = order,
                    product = product,
                    quantity = item['quantity'],
                    storage_variation_name = item['storage_variation_name'],
                    color_variation_name = item['color_variation_name'],
                    variation_price = item['variation_price'],
                )
        
 
    return JsonResponse(data, safe=False)