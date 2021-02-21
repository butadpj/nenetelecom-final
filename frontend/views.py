from django.shortcuts import render
from django.http import JsonResponse
import json

from backend.cart.models import *
from backend.store.models import *
# Create your views here.
def index(request):
    return render(request, 'REACT/main/index.html')


def process_order(request):
    data = json.loads(request.body)
    total = float(data['form']['total'])
    return JsonResponse(f'Payment complete!... Total: {total}', safe=False)