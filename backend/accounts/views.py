from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from .forms import UserForm
from django.contrib import messages
from django.contrib.auth import get_user_model
from backend.store.models import Customer
import json

# Create your views here.
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

            
        usernamesArr = []
        users = get_user_model().objects.all()
        for user in users:
            usernamesArr.append(user.username)
        json_usernamesArr = json.dumps(usernamesArr)

        context = {'form': form, 'usernames': json_usernamesArr, }
        return render(request, 'DJANGO/accounts/register.html', context)


def login_page(request):
    if request.user.is_authenticated:
        return redirect('/')

    else: 
        if request.method == "POST":
            username = request.POST.get('username')
            password = request.POST.get('password')

            usernames = {''}
            existed_users = get_user_model().objects.all()
            for user in existed_users:
                uname = user.username
                usernames.add(uname)


            if not username in usernames:
                messages.info(request, 'User does not exist')
            else:
                messages.info(request, 'Username or password does not match')
        
            user = authenticate(request, username=username, password=password)

            if user:
                login(request, user)
                return redirect('/store/')
            

           

            

            
        
        return render(request, 'DJANGO/accounts/login.html')


def logout_user(request):
    logout(request)
    return redirect('login')
