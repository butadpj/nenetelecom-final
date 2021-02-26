from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from .forms import UserForm, UserProfileForm
from django.contrib import messages

# Create your views here.
def register_page(request):
    if request.user.is_authenticated:
        return redirect('/store/')

    else:
        if request.method == "POST":
            form = UserForm(request.POST)
            profile_form = UserProfileForm(request.POST)

            if form.is_valid() and profile_form.is_valid():
                user = form.save()
                profile = profile_form.save(commit=False)
                profile.user = user

                profile.save()
                username = form.cleaned_data.get('username')
                password = form.cleaned_data.get('password1')

                user = authenticate(username=username, password=password)
                login(request, user)

                return redirect('login')
        
        else:
            form = UserForm()
            profile_form = UserProfileForm() 

        context = {'form': form, 'profile_form': profile_form}
        return render(request, 'DJANGO/accounts/register.html', context)


def login_page(request):
    if request.user.is_authenticated:
        return redirect('/')

    else: 
        if request.method == "POST":
            username = request.POST.get('username')
            password = request.POST.get('password')

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return redirect('/store/')

            else: 
                messages.info(request, 'Username or password does not match')
        
        return render(request, 'DJANGO/accounts/login.html')


def logout_user(request):
    logout(request)
    return redirect('login')
