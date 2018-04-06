from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/andreacruz/Documentos/Courses_M2/Innovative_Technologies/" \
                                                "TwitterSentimentAnalysis-113cdb24add5.json"

# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'restfulapi',
        'USER': 'restfulapi',
        'PASSWORD': 'restfulapi',
        'HOST': 'localhost',
    }
}