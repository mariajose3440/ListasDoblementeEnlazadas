SET FOREIGN_KEY_CHECKS = 0;

-- Estas dos tablas pertenecen al servicio de usuarios. Las tablas del
-- catálogo se crean mediante las migraciones de catalogo_ws.
CREATE TABLE IF NOT EXISTS Preferencia (
  id_preferencia INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS UsuarioPreferencia (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_preferencia INT NOT NULL,
  CONSTRAINT usuario_preferencia_unica UNIQUE (id_usuario, id_preferencia),
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
  FOREIGN KEY (id_preferencia) REFERENCES Preferencia(id_preferencia)
);
SET FOREIGN_KEY_CHECKS = 1;
