from .development import *

DEBUG = False

ALLOWED_HOSTS = ['localhost', '*']

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

STATIC_ROOT = os.path.join(BASE_DIR, "static_files")
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
