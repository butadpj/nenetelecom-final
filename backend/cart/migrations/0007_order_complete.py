# Generated by Django 3.1.6 on 2021-02-21 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0006_order_paid'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='complete',
            field=models.BooleanField(default=False),
        ),
    ]
