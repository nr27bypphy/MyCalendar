# Generated by Django 2.2.8 on 2019-12-06 14:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('calen', '0002_categories'),
    ]

    operations = [
        migrations.AddField(
            model_name='schedule',
            name='category_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='calen.Categories'),
            preserve_default=False,
        ),
    ]
