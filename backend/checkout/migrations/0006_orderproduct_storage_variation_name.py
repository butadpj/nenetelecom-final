# Generated by Django 3.1.7 on 2021-04-12 12:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('checkout', '0005_auto_20210412_2029'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderproduct',
            name='storage_variation_name',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]