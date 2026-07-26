from rest_framework import generics
from django.db.models import Q
from .models import Video
from .serializers import VideoSerializer


class CatalogoVideoList(generics.ListAPIView):
    serializer_class = VideoSerializer

    def get_queryset(self):
        queryset = Video.objects.prefetch_related('preferencias').all()
        preferencias = self.request.query_params.getlist('preferencia')

        # También acepta ?preferencias=musica,dance para clientes sencillos.
        preferencias_csv = self.request.query_params.get('preferencias', '')
        preferencias.extend(preferencias_csv.split(','))
        preferencias = {
            preferencia.strip()
            for preferencia in preferencias
            if preferencia.strip()
        }

        if preferencias:
            filtro = Q()
            for preferencia in preferencias:
                filtro |= Q(preferencias__nombre__iexact=preferencia)
            queryset = queryset.filter(filtro).distinct()

        return queryset
