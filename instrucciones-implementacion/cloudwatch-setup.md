# Configuración de Monitoreo y Alarmas con CloudWatch

## 1. Objetivo

Monitorear el estado y rendimiento de los recursos implementados, especialmente la instancia EC2, y establecer notificaciones automatizadas mediante SNS ante eventos críticos, como fallos o alto uso de CPU.

## 2. Métricas Monitorizadas

Las siguientes métricas fueron habilitadas para la instancia EC2:

- **CPUUtilization:** Porcentaje de utilización del procesador.
- **NetworkIn:** Tráfico de entrada de red (bytes).
- **StatusCheckFailed:** Indica si la instancia falla en alguno de los dos chequeos de estado (sistema o instancia).

Estas métricas permiten tomar decisiones informadas sobre el estado operativo de la infraestructura y reaccionar oportunamente a incidentes.

## 3. Tópico SNS para Notificaciones

- **Nombre:** `Notificaciones-Metricas`
- **Suscriptores:** Correo electrónico
- **Acción:** Recibir notificaciones automáticas desde CloudWatch cuando se cumplan las condiciones definidas en las alarmas.

## 4. Alarmas Configuradas

### 4.1 Alarma: `Utilización de CPU`

- **Métrica:** `CPUUtilization`
- **Condición:** Mayor o igual a 70%
- **Periodo:** 5 minutos
- **Acción:** Envío de notificación a un tópico SNS (`Notificaciones-Metricas`)
- **Propósito:** Detectar posibles sobrecargas en la instancia EC2.

### 4.2 Alarma: `fallo-instancia`

- **Métrica:** `StatusCheckFailed`
- **Condición:** Mayor que 0
- **Periodo:** 5 minutos
- **Acción:** 
  - Notificación al tópico SNS `Notificaciones-Metricas`
  - Reinicio automático de la instancia EC2
- **Propósito:** Recuperación automática ante errores detectados por los chequeos de estado de AWS.

## 5. Consideraciones

- Estas alarmas ayudan a mantener la infraestructura disponible y operativa con intervención mínima del usuario.
- La integración entre CloudWatch y SNS permite implementar flujos automatizados de recuperación o escalamiento.
- Es posible ampliar el monitoreo agregando logs de aplicación, métricas personalizadas y dashboards para análisis en tiempo real.
