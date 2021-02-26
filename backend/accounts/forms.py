from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from backend.store.models import Customer
from django.contrib.auth.models import User
from django import forms

class UserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'password1', 'password2']
    

    def save(self, commit=True):
        user = super().save(commit=False)

        if commit:
            user.save()
        return user


class UserProfileForm(forms.ModelForm):

    class Meta:
        model = Customer
        fields = ['first_name', 'last_name', 'mobile_number']

    
    def clean_mobile_number(self):
        mobile_number = self.cleaned_data.get('mobile_number')

        if len(mobile_number) != 11 or not mobile_number.isdigit():
            raise forms.ValidationError('Enter a valid mobile number')
        
        for instance in Customer.objects.exclude(user__isnull=True):
            if instance.mobile_number == mobile_number:
                raise forms.ValidationError('A user with that mobile number already exists')

        return mobile_number