# Generated by Django 3.1.7 on 2021-04-01 08:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_customer_display_picture'),
        ('cart', '0002_auto_20210401_1351'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bagitem',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='store.product'),
        ),
    ]
