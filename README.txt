Before you run the project. Configure the following settings first

1. Export an environment settings by typing the command below in your terminal.

   for development:
   export DJANGO_SETTINGS_MODULE=nenetelecom.settings.development

   for production
   export DJANGO_SETTINGS_MODULE=nenetelecom.settings.production

2. create a .env file in the project directory and add the text below:

   SECRET_KEY=PUT_YOUR_SECRET_KEY_HERE
