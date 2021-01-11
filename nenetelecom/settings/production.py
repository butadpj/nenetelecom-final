from .development import *

DEBUG = True

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

STATIC_ROOT = os.path.join(BASE_DIR, "static_files")