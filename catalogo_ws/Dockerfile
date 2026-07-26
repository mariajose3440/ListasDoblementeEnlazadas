# 1. Usar una imagen oficial de Python ligera
FROM python:3.10-slim

# 2. Evitar que Python genere archivos .pyc y forzar la salida en consola
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 3. Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# 4. Instalar dependencias del sistema (necesarias para conectar MySQL con Django)
RUN apt-get update \
    && apt-get install -y pkg-config default-libmysqlclient-dev build-essential \
    && rm -rf /var/lib/apt/lists/*

# 5. Copiar el archivo de requerimientos e instalarlos
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# 6. Copiar todo el código de tu proyecto al contenedor
COPY . /app/

# 7. Exponer el puerto 8004
EXPOSE 8004

# 8. Comando para arrancar el servidor de Django en el puerto 8004
CMD ["python", "manage.py", "runserver", "0.0.0.0:8004"]