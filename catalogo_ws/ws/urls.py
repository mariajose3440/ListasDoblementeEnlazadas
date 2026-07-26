from django.urls import path
from . import views

urlpatterns = [
    path('videos/', views.CatalogoVideoList.as_view(), name='catalogo-videos'),
]
