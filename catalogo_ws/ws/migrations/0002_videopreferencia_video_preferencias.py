# Generated manually to connect catalog videos with their preferences.

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ws', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='VideoPreferencia',
            fields=[
                (
                    'id',
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name='ID',
                    ),
                ),
                (
                    'preferencia',
                    models.ForeignKey(
                        db_column='id_preferencia',
                        on_delete=django.db.models.deletion.CASCADE,
                        to='ws.preferencia',
                    ),
                ),
                (
                    'video',
                    models.ForeignKey(
                        db_column='id_video',
                        on_delete=django.db.models.deletion.CASCADE,
                        to='ws.video',
                    ),
                ),
            ],
            options={
                'db_table': 'video_preferencia',
                'constraints': [
                    models.UniqueConstraint(
                        fields=('video', 'preferencia'),
                        name='video_preferencia_unica',
                    ),
                ],
            },
        ),
        migrations.AddField(
            model_name='video',
            name='preferencias',
            field=models.ManyToManyField(
                related_name='videos',
                through='ws.VideoPreferencia',
                to='ws.preferencia',
            ),
        ),
    ]
