# Generated by Django 2.0.6 on 2018-06-07 14:18

from django.db import migrations, models
import expenses.models


class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='image',
            field=models.ImageField(blank=True, upload_to=expenses.models.get_image_path),
        ),
    ]
