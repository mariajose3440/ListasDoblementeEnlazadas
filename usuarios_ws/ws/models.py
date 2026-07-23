from django.db import models

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    email = models.CharField(max_length=100, unique=True)
    contrasena = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'Usuario'


class Preferencia(models.Model):
    id_preferencia = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'Preferencia'


class UsuarioPreferencia(models.Model):
    id = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario, models.DO_NOTHING, db_column='id_usuario')
    id_preferencia = models.ForeignKey(Preferencia, models.DO_NOTHING, db_column='id_preferencia')

    class Meta:
        managed = False
        db_table = 'UsuarioPreferencia'
