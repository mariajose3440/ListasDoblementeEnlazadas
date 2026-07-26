from django.apps import AppConfig

# Cambia VideosConfig por WsConfig:
class WsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ws'
