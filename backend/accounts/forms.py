from django.contrib.auth.forms import UserCreationForm
from backend.store.models import Customer
from django.contrib.auth import get_user_model
from django import forms

class UserForm(UserCreationForm):
    class Meta:
        model = get_user_model()
        fields = ['username', 'mobile_number', 'first_name', 'last_name', 'complete_address', 'password1', 'password2']

    def clean_mobile_number(self):
        mobile_number = self.cleaned_data.get('mobile_number')

        if len(mobile_number) != 11 or not mobile_number.isdigit():
            raise forms.ValidationError('Enter a valid mobile number')
        
        for instance in Customer.objects.exclude(user__isnull=True):
            if instance.mobile_number == mobile_number:
                raise forms.ValidationError('A user with that mobile number already exists')

        return mobile_number

