#* Automate makemigrations and migrate commands. 
#? Read more from "README.txt" file

#!/bin/bash 

## set DJANGO_SETTINGS_MODULE
read -p "Select an environment to export (dev or prod): " ENV

if [ $ENV == 'dev' ]
then
    python manage.py makemigrations --settings=nenetelecom.settings.development
    python manage.py migrate --settings=nenetelecom.settings.development
else
    python manage.py makemigrations --settings=nenetelecom.settings.production
    python manage.py migrate --settings=nenetelecom.settings.production
fi
