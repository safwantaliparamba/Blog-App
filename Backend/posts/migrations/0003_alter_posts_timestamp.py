# Generated by Django 4.1 on 2022-08-17 06:04

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_posts_is_deleted_alter_posts_timestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 17, 11, 34, 28, 618139), editable=False),
        ),
    ]
