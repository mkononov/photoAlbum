# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-06-04 18:50
from __future__ import unicode_literals

from django.db import migrations
import sorl.thumbnail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('PhotoGallery', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imagewithcomment',
            name='image',
            field=sorl.thumbnail.fields.ImageField(max_length=200, upload_to='images/'),
        ),
    ]
