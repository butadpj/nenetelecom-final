from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import ugettext_lazy as _


# Create your models here.
class CustomUserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    def _create_user(self, username, mobile_number, first_name, last_name, complete_address, password=None, **extra_fields):
        if not mobile_number:
            raise ValueError('The given mobile number must be set')
        mobile_number = mobile_number.replace(" ", "")
        first_name = first_name.lstrip()
        last_name = last_name.lstrip()
        complete_address = complete_address.lstrip()
        user = self.model(username=username, mobile_number=mobile_number, first_name=first_name, last_name=last_name, complete_address=complete_address, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user



    def create_user(self, username, mobile_number, first_name, last_name, complete_address, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, mobile_number, first_name, last_name, complete_address, password, **extra_fields)

    def create_superuser(self, username, mobile_number, first_name, last_name, complete_address, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, mobile_number, first_name, last_name, complete_address, password, **extra_fields)


class CustomUser(AbstractUser):
    username = models.CharField(max_length=50, null=True, blank=True, unique=True)
    mobile_number = models.CharField(max_length=15, null=False, blank=False, unique=True, verbose_name='Mobile number (AU)')
    first_name = models.CharField(max_length=30, null=False, blank=False, verbose_name='First name (AU)')
    last_name = models.CharField(max_length=30, null=False, blank=False, verbose_name='Last name (AU)')
    complete_address = models.CharField(max_length=100, null=True, blank=True, verbose_name='Complete address (AU)')

    def __str__(self):
        return self.first_name

    USERNAME_FIELD = 'username'

    REQUIRED_FIELDS = ['mobile_number', 'first_name', 'last_name', 'complete_address']


    objects = CustomUserManager()



