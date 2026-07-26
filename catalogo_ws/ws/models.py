from django.db import models

class Video(models.Model):
    titulo = models.CharField(max_length=100)
    autor = models.CharField(max_length=50)
    url_video = models.CharField(max_length=255)
    descripcion = models.TextField()
    likes = models.IntegerField(default=0)

    class Meta:
        db_table = 'video'

class Preferencia(models.Model):
    nombre = models.CharField(max_length=50)

    class Meta:
        db_table = 'preferencia' 