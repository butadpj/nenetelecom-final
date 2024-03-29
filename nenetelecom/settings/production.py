from .development import *

DEBUG = False

ALLOWED_HOSTS = ['nenetelecom.pythonanywhere.com', 'www.nenetelecom.app', 'store.nenetelecom.app']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'nenetelecom$nenetelecom',
        'USER': 'nenetelecom',
        'PASSWORD': 'madeinjapan123',
        'HOST': 'nenetelecom.mysql.pythonanywhere-services.com',
        'PORT': ''
    }
}

# INSTALLED_APPS += [
#     'sslserver'
# ]

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'DEFAULT_PERMISSION_CLASSES' : ('rest_framework.permissions.IsAuthenticatedOrReadOnly',)
}
