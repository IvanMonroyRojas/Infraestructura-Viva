# Configuración de SNS y SQS

## 1. Objetivo

Implementar un flujo de mensajería entre servicios utilizando **Amazon SNS** (Simple Notification Service) y **Amazon SQS** (Simple Queue Service), implementando un escenario donde una aplicación publica mensajes que pueden ser consumidos por distintos sistemas o usuarios.

## 2. Configuración de SNS

- **Nombre del tópico:** `Notificaciones-Inventario`
- **Tipo de tópico:** Estándar
- **Protocolo de entrega:** 
  - Email
  - Amazon SQS
- **Subscripciones creadas:**
  - Un correo electrónico (verificado por el usuario)
  - Una cola SQS (`Cola-Notificaciones-Inventario`)

## 3. Configuración de SQS

- **Nombre de la cola:** `Cola-Notificaciones-Inventario`
- **Tipo:** Cola estándar
- **Configuraciones destacadas:**
  - Tiempo de retención de mensajes: 4 días
  - Tiempo de visibilidad: 30 segundos
  - Recepción de mensajes desde SNS habilitada

## 4. Configuración de Dead Letter Queue (DLQ)

- **Nombre de la cola DLQ:** `DLQ-Notificaciones-Inventario`
- **Configuración en cola principal:**
  - Redirección a la DLQ luego de 3 intentos fallidos

> ⚠️ Esto permite garantizar que los mensajes que no pudieron ser procesados no se pierdan, sino que sean almacenados para su análisis posterior.

## 5. Aplicación Node.js en EC2

Se desarrolló una pequeña [aplicación](publicar.js) en Node.js alojada en la instancia EC2, que permite publicar mensajes al tópico SNS. Esta aplicación hace uso del SDK oficial de AWS.

## 6. Flujo de funcionamiento

1. Una aplicación (en este caso desde EC2) publica un mensaje en el tópico SNS `Notificaciones-Inventario`.
2. SNS distribuye el mensaje a todos sus suscriptores:
   - El mensaje se envía por correo electrónico a los usuarios suscritos.
   - El mensaje es enviado a la cola SQS `Cola-Notificaciones-Inventario`.
3. Si la cola principal no logra entregar un mensaje después de 3 intentos, este se redirige automáticamente a la **DLQ** `DLQ-Notificaciones-Inventario`.