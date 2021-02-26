from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from backend.store.models import Customer
from backend.accounts.models import CustomUser
from django import forms

class UserForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ['username', 'mobile_number', 'first_name', 'last_name', 'complete_address', 'password1', 'password2']
    

    def save(self, commit=True):
        user = super().save(commit=False)

        if commit:
            user.save()
        return user


