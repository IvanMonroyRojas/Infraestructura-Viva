SELECT *
FROM clientes;
---------
SELECT id,
    cliente_id,
    asunto,
    fecha_creacion
FROM tickets_soporte
WHERE estado = 'Abierto';
---------
SELECT estado,
    COUNT(*) AS cantidad
FROM tickets_soporte
GROUP BY estado;