# Generated by Django 5.2.1 on 2025-05-19 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('history', '0002_alter_history_summary_prediction'),
    ]

    operations = [
        migrations.AddField(
            model_name='history_prediction',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='predictions/'),
        ),
    ]
