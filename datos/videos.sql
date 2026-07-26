/*
Catálogo inicial.

Los IDs y nombres de preferencia se mantienen iguales a los de la base
Usuarios. Los servicios continúan relacionándose por nombre, pero conservar
los mismos IDs facilita consultar y verificar ambas bases.

Ejecutar después de las migraciones de catalogo_ws.
*/

INSERT INTO video (id, titulo, autor, url_video, descripcion, likes) VALUES
(1, 'Minahonda', 'bluebul', '/video1.mp4', '#wow #humor', 0),
(2, 'Olympics', 'Hoku.Blend', '/video2.mp4', '#deporte #mundial2026 #formula1', 50),
(3, 'Salsa', 'ColombiaSalsa', '/video3.mp4', '#dance #musica', 10),
(4, 'GymVlog', 'FitnessCinemastic', '/video4.mp4', '#fitness', 20),
(5, 'ContenidoEnTendencia', 'GlowAgencia', '/video5.mp4', '#contenido', 35),
(6, 'Maquillaje', 'Teresa', '/video6.mp4', '#maquillaje', 3000),
(7, 'Mundial2026', 'lgsq2', '/video7.mp4', '#mundial2026', 500),
(8, 'Kpop', 'lunesvra', '/video8.mp4', '#kpop', 600),
(9, 'BTS', 'verskuy.edit', '/video9.mp4', '#BTS #kpop', 20000000)
ON DUPLICATE KEY UPDATE
    titulo = VALUES(titulo),
    autor = VALUES(autor),
    url_video = VALUES(url_video),
    descripcion = VALUES(descripcion),
    likes = VALUES(likes);

INSERT INTO preferencia (id, nombre) VALUES
(1, 'libros'),
(2, 'snoopy'),
(3, 'humor'),
(4, 'formula1'),
(5, 'programacion'),
(6, 'BTS'),
(7, 'mundial2026'),
(8, 'maquillaje'),
(9, 'kpop'),
(10, 'WoW'),
(11, 'IA'),
(12, 'existencialismo'),
(13, 'manhwa'),
(14, 'musica'),
(15, 'dance'),
(16, 'deporte'),
(17, 'contenido'),
(18, 'fitness')
ON DUPLICATE KEY UPDATE
    nombre = VALUES(nombre);

-- Elimina únicamente las relaciones de los cinco videos del catálogo inicial.
DELETE FROM video_preferencia
WHERE id_video IN (1, 2, 3, 4, 5);

/*
Distribución:
  Video 1: entretenimiento y gaming.
  Video 2: deportes.
  Video 3: música y baile.
  Video 4: fitness.
  Video 5: tendencias.
*/
INSERT INTO video_preferencia (id_video, id_preferencia) VALUES
(1, 3),   -- humor
(1, 10),  -- WoW

(2, 7),   -- mundial2026
(2, 16),  -- deporte

(3, 14),  -- musica
(3, 15),  -- dance

(4, 18),  -- fitness

(5, 17), -- contenido

(6, 8),  -- maquillaje
(7, 7),  -- mundial2026
(8, 9),  -- kpop
(9, 6),  -- BTS
(9, 9);  -- BTS,kpop
