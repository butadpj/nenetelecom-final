# Generated by Django 3.1.7 on 2021-02-27 07:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='complete_address',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Complete address (AU)'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='first_name',
            field=models.CharField(max_length=30, verbose_name='First name (AU)'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='last_name',
            field=models.CharField(max_length=30, verbose_name='Last name (AU)'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='mobile_number',
            field=models.CharField(max_length=15, unique=True, verbose_name='Mobile number (AU)'),
        ),
    ]