from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario
from .serializers import UsuarioSerializer


class UsuarioListView(ListAPIView):
    serializer_class = UsuarioSerializer

    def get_queryset(self):
        queryset = Usuario.objects.all()
        nombre = self.request.GET.get('nombre')
        if nombre:
            queryset = queryset.filter(nombre__icontains=nombre)
        return queryset


class UsuarioPorEmailView(APIView):
    def get(self, request, email):
        try:
            usuario = Usuario.objects.get(email=email)
            serializer = UsuarioSerializer(usuario)
            return Response(serializer.data)
        except Usuario.DoesNotExist:
            return Response(
                {"error": f"No se encontró usuario con email {email}"},
                status=status.HTTP_404_NOT_FOUND
            )
