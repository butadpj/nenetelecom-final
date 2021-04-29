from .base import *

DEBUG = True

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_cleanup.apps.CleanupConfig',
    'django_filters',
    'backend',
    'backend.api',
    'backend.api2',
    'backend.accounts',
    'backend.store',
    'backend.cart',
    'backend.checkout',
    'backend.djangopush',
    'frontend',
    'rest_framework',
    'webpush',
    'django_seed',
    'django_auto_prefetching',
]

WEBPUSH_SETTINGS = {
    "VAPID_PUBLIC_KEY": "BKKttlbqOVOO6P_kJFYtLWCPgX4Ca3i8HGEAJNoMaEB2un94nfU7IkKyg1S2qoIJ-VFjOZX3mQU1f4UQ9BM537w",
    "VAPID_PRIVATE_KEY":"gwl-6BzopVH9QLOQHQ-Q7LfmtqQdcspdi_5eE0NAZB8",
    "VAPID_ADMIN_EMAIL": "butadpj@gmail.com"
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

AUTH_USER_MODEL = 'accounts.CustomUser'

AUTHENTICATION_BACKENDS = [
    'backend.accounts.backends.MyMobileNumberBackend', # our custom authentication backend
    'django.contrib.auth.backends.ModelBackend' # fallback to default authentication backend if first fails 
]


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

DATE_INPUT_FORMATS = ['%d-%m-%Y']


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'nenetelecom',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': ''
    }
}

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
    ),
}


STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'public')
]
STATIC_ROOT = os.path.join(BASE_DIR, "server_public")


MEDIA_URL = '/images/uploads/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'public/uploads/')

