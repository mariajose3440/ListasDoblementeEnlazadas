from django.test import TestCase
from rest_framework.test import APIClient

from .models import Preferencia, Video, VideoPreferencia


class CatalogoPersonalizadoTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.video_dance = Video.objects.create(
            titulo='Salsa',
            autor='ColombiaSalsa',
            url_video='videos/video3.mp4',
            descripcion='#dance',
            likes=10,
        )
        self.video_fitness = Video.objects.create(
            titulo='GymVlog',
            autor='FitnessCinemastic',
            url_video='videos/video4.mp4',
            descripcion='#fitness',
            likes=20,
        )
        dance = Preferencia.objects.create(nombre='dance')
        fitness = Preferencia.objects.create(nombre='fitness')
        VideoPreferencia.objects.create(
            video=self.video_dance,
            preferencia=dance,
        )
        VideoPreferencia.objects.create(
            video=self.video_fitness,
            preferencia=fitness,
        )

    def test_filtra_por_cualquier_preferencia_del_usuario(self):
        respuesta = self.client.get(
            '/ws/catalogo/videos/',
            {'preferencia': ['DANCE', 'inexistente']},
        )

        self.assertEqual(respuesta.status_code, 200)
        self.assertEqual(len(respuesta.data), 1)
        self.assertEqual(respuesta.data[0]['titulo'], 'Salsa')
        self.assertEqual(
            respuesta.data[0]['preferencias'],
            [{'nombre': 'dance'}],
        )

    def test_sin_preferencias_devuelve_catalogo_completo(self):
        respuesta = self.client.get('/ws/catalogo/videos/')

        self.assertEqual(respuesta.status_code, 200)
        self.assertEqual(len(respuesta.data), 2)
