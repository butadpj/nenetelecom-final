# Generated by Django 3.1.7 on 2021-04-08 05:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0007_auto_20210408_1351'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bagitem',
            name='variation_price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]
