# Generated by Django 4.1.7 on 2023-05-17 16:10

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Movies", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="moviestatus",
            name="description",
            field=models.TextField(blank=True, max_length=100, null=True),
        ),
    ]
