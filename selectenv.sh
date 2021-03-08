#* Automate the initial configuration setup. 
#? Read more from "README.txt" file

#!/bin/bash 

## set DJANGO_SETTINGS_MODULE
read -p "Select an environment to export (dev or prod): " ENV

if [ $ENV == 'dev' ]
then
    python manage.py runserver --settings=nenetelecom.settings.development
else
    python manage.py runserver --settings=nenetelecom.settings.production
fi
