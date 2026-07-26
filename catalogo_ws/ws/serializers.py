from rest_framework import serializers
from .models import Video, Preferencia

class PreferenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferencia
        # Solo queremos mostrar el nombre del hashtag en el JSON final
        fields = ['nombre'] 

class VideoSerializer(serializers.ModelSerializer):
    # Anidamos las preferencias para que salgan dentro de cada video
    preferencias = PreferenciaSerializer(many=True, read_only=True)

    class Meta:
        model = Video
        fields = ['id', 'titulo', 'autor', 'url_video', 'descripcion', 'likes', 'preferencias']