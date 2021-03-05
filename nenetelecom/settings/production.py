from .development import *

DEBUG = False

ALLOWED_HOSTS = ['']

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'yourusername$databasename',
#         'USER': 'yourusername',
#         'PASSWORD': 'yourpassword',
#         'HOST': 'yourusername.mysql.pythonanywhere-services.com',
#         'PORT': ''
#     }
# }

# INSTALLED_APPS += [
#     'sslserver'
# ]

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'DEFAULT_PERMISSION_CLASSES' : ('rest_framework.permissions.IsAuthenticatedOrReadOnly',)
}

