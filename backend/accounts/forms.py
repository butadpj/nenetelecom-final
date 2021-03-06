from django.contrib.auth.forms import UserCreationForm
from backend.store.models import Customer
from django.contrib.auth import get_user_model
from django import forms
from django.forms import PasswordInput

class UserForm(UserCreationForm):
    password2 = None
    class Meta:
        model = get_user_model()
        fields = ['username', 'mobile_number', 'first_name', 'last_name', 'complete_address', 'password1']


    def clean_mobile_number(self):
        mobile_number = self.cleaned_data.get('mobile_number')

        if len(mobile_number) != 11 or not mobile_number.isdigit():
            raise forms.ValidationError('Enter a valid mobile number')
        
        for instance in Customer.objects.exclude(user__isnull=True):
            if instance.mobile_number == mobile_number:
                raise forms.ValidationError('A user with that mobile number already exists')

        return mobile_number
    
    def clean_password1(self):
        password1 = self.cleaned_data.get('password1')

        if len(password1) < 8:
            raise forms.ValidationError('Your password is too short, minimum of 8 characters is allowed')
        
        return password1


# def __init__(self, *args, **kwargs):
#     super(UserForm, self).__init__(*args, **kwargs)
#     self.fields['password1'].widget = PasswordInput(attrs={'class': 'form-control'})
#     self.fields['password2'].widget = PasswordInput(attrs={'class': 'form-control'})