/*
docker exec -it greenfeed-backend python manage.py migrate
*/

CREATE TABLE Preferencia (
  id_preferencia INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE UsuarioPreferencia (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_preferencia INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
  FOREIGN KEY (id_preferencia) REFERENCES Preferencia(id_preferencia)
);
