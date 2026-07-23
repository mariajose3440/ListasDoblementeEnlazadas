from rest_framework import serializers
from .models import Usuario, Preferencia, UsuarioPreferencia

class PreferenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferencia
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    preferencias = serializers.SerializerMethodField()

    class Meta:
        model = Usuario
        fields = ['id_usuario', 'nombre', 'email', 'contrasena', 'preferencias']

    def get_preferencias(self, obj):
        relaciones = UsuarioPreferencia.objects.filter(id_usuario=obj)
        return [r.id_preferencia.nombre for r in relaciones]
