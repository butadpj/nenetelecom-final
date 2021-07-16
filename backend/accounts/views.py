from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from .forms import UserForm
from django.contrib import messages
from django.contrib.auth import get_user_model
from backend.store.models import Customer
from django.views.decorators.clickjacking import xframe_options_exempt

import json

# Create your views here.
@xframe_options_exempt
def register_page(request):
    if request.user.is_authenticated:
        return redirect('/store/')

    else:
        if request.method == "POST":
            form = UserForm(request.POST)
            if form.is_valid():
                user = form.save()
                username = form.cleaned_data.get('username')
                password = form.cleaned_data.get('password1')

                user = authenticate(username=username, password=password)

                login(request, user)
                get_user = get_user_model().objects.get(username=username)
                customer = Customer.objects.create(user=get_user)
                customer.save()
                return redirect('/store/')
        
        else:
            form = UserForm()

            
        usernames = []
        users = get_user_model().objects.all()
        for user in users:
            usernames.append(user.username)

        mobile_numbers = []
        customers = Customer.objects.all()
        for customer in customers:
            try:
                mobile_numbers.append(customer.au_mobile_number)
            except:
                pass


        context = {'form': form, 'usernames': json.dumps(usernames), 'mobile_numbers': json.dumps(mobile_numbers) }
        return render(request, 'DJANGO/accounts/register.html', context)

@xframe_options_exempt
def login_page(request):
    if request.user.is_authenticated:
        return redirect('/store/')

    else: 
        if request.method == "POST":
            username = request.POST.get('username')
            password = request.POST.get('password')

            unames_and_mnumbers = {''}

            existed_users = get_user_model().objects.all()
            for user in existed_users:
                uname = user.username
                mnumber = user.mobile_number
                unames_and_mnumbers.add(uname)
                unames_and_mnumbers.add(mnumber)

            if username not in unames_and_mnumbers:
                messages.info(request, 'User does not exist')
            else:
                messages.info(request, 'Username or password does not match')
        
            user = authenticate(request, username=username, password=password)
            

            if user:
                login(request, user)
                return redirect('/store/')
            
        else:
            pass

            

            
        
        return render(request, 'DJANGO/accounts/login.html')


def logout_user(request):
    logout(request)
    return redirect('login')
