-- Asigna preferencias a cada usuario (relación muchos a muchos)
-- usuario 1: preferencias 1-5 | usuario 3: 6-9 | usuario 2: 10,11,12,13,3,6,14 | usuario 4: 15-18
INSERT INTO UsuarioPreferencia (id_usuario, id_preferencia) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
(3, 6), (3, 7), (3, 8), (3, 9),
(2, 10), (2, 11), (2, 12), (2, 13), (2, 3), (2, 6), (2, 14),
(4, 15), (4, 16), (4, 17), (4, 18);