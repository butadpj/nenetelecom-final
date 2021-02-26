from django.contrib.auth import get_user_model
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password


class MyMobileNumberBackend(BaseBackend):
    
    def authenticate(self, request, username=None, password=None):
        my_user_model = get_user_model()
        try:
            user = my_user_model.objects.get(mobile_number=username)
            if user.check_password(password):
                return user
        except my_user_model.DoesNotExist:
            return None
        except:
            return None

    def get_user(self, user_id):
        my_user_model = get_user_model()
        try:
            return my_user_model.objects.get(pk=user_id)
        except my_user_model.DoesNotExist:
            return None
