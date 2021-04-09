# Generated by Django 3.1.7 on 2021-04-08 05:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0008_auto_20210408_1353'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bagitemvariation',
            name='category',
            field=models.CharField(blank=True, choices=[('Storage Size', 'Storage Size'), ('Color Family', 'Color Family')], default='Storage Size', max_length=30),
        ),
        migrations.AlterField(
            model_name='bagitemvariation',
            name='name',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]