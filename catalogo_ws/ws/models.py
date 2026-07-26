from django.db import models

class Video(models.Model):
    titulo = models.CharField(max_length=100)
    autor = models.CharField(max_length=50)
    url_video = models.CharField(max_length=255)
    descripcion = models.TextField()
    likes = models.IntegerField(default=0)
    preferencias = models.ManyToManyField(
        'Preferencia',
        through='VideoPreferencia',
        related_name='videos',
    )

    class Meta:
        db_table = 'video'


class Preferencia(models.Model):
    nombre = models.CharField(max_length=50)

    class Meta:
        db_table = 'preferencia'


class VideoPreferencia(models.Model):
    video = models.ForeignKey(Video, models.CASCADE, db_column='id_video')
    preferencia = models.ForeignKey(
        Preferencia,
        models.CASCADE,
        db_column='id_preferencia',
    )

    class Meta:
        db_table = 'video_preferencia'
        constraints = [
            models.UniqueConstraint(
                fields=['video', 'preferencia'],
                name='video_preferencia_unica',
            ),
        ]
