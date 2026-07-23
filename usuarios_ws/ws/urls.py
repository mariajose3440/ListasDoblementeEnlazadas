from django.urls import path
from .views import UsuarioListView, UsuarioPorEmailView

urlpatterns = [
    path('usuarios/', UsuarioListView.as_view(), name='usuarios'),
    path('usuarios/email/<str:email>/', UsuarioPorEmailView.as_view(), name='usuario-por-email'),
]
