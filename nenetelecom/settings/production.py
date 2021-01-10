from .dev import *

DEBUG = False

ALLOWED_HOSTS = ['some_domain_name.com']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'yourusername$databasename',
        'USER': 'yourusername',
        'PASSWORD': 'yourpassword',
        'HOST': 'yourusername.mysql.pythonanywhere-services.com',
        'PORT': ''
    }
}


STATIC_ROOT = '/home/yourusername/yourprojectname/static'