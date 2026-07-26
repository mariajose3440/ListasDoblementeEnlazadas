/*
docker exec -it greenfeed-backend python manage.py migrate
*/
SET FOREIGN_KEY_CHECKS = 0;
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

CREATE TABLE Video (
    id_video INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor VARCHAR(100) NOT NULL,    
    url_video VARCHAR(255) NOT NULL, 
    descripcion TEXT,               
    likes INT DEFAULT 0             
);

CREATE TABLE VideoPreferencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_video INT NOT NULL,
    id_preferencia INT NOT NULL,
    FOREIGN KEY (id_video) REFERENCES Video(id_video),
    FOREIGN KEY (id_preferencia) REFERENCES Preferencia(id_preferencia) 
); 
SET FOREIGN_KEY_CHECKS = 1;