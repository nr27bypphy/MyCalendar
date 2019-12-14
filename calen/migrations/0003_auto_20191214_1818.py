# Generated by Django 2.2.8 on 2019-12-14 09:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calen', '0002_auto_20191214_1805'),
    ]

    operations = [
        migrations.RenameField(
            model_name='action',
            old_name='created_date',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='categories',
            old_name='created_date',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='condition',
            old_name='created_date',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='schedule',
            old_name='created_date',
            new_name='created_at',
        ),
        migrations.AlterField(
            model_name='categories',
            name='category',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
