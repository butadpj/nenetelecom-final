# Generated by Django 3.1.7 on 2021-03-28 02:39

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Shipping',
            fields=[
                ('transaction_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('address', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=50)),
                ('province', models.CharField(max_length=50)),
                ('zip_code', models.CharField(max_length=10)),
                ('date_placed', models.DateTimeField(auto_now_add=True)),
                ('delivered', models.BooleanField(blank=True, default=False)),
                ('customer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='store.customer')),
            ],
            options={
                'ordering': ('-date_placed',),
            },
        ),
    ]
