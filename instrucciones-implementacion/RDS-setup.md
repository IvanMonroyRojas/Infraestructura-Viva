# Configuración de RDS MySQL

## 1. Configuración de la base de datos gestionada

- **Motor:** Amazon RDS MySQL
- **Versión:** MySQL 8.0.35
- **Tipo de instancia:** db.t3.micro (capa gratuita)
- **Región:** us-east-1
- **VPC:** Previamente configurada
- **Subred:** Privada (us-east-1a)
- **DB Subnet Group:** Incluye dos subredes privadas en distintas zonas de disponibilidad (requisito de RDS)
- **Acceso público:** No (solo accesible desde la instancia EC2)
- **Autenticación:** Usuario y contraseña
- **Almacenamiento:** 20 GB (almacenamiento general SSD)
- **Copia de seguridad automática:** Habilitada
- **Grupo de seguridad:** Solo permite tráfico desde la instancia EC2

## 2. Conexión desde EC2

- Se accede a la instancia EC2 (Windows) mediante RDP.
- Se instala **Visual Studio Code** y la extensión **SQLTools**.
- Se configura la conexión a la base de datos con los siguientes parámetros:

  - **Host:** endpoint de la base de datos (por ejemplo: `rds-inventario.xxx.us-east-1.rds.amazonaws.com`)
  - **Puerto:** 3306
  - **Usuario:** (usuario configurado en RDS)
  - **Contraseña:** (configurada al crear la base)
  - **Base de datos:** inventario

## 3. Pruebas realizadas

- Se conectó exitosamente desde SQLTools en la instancia EC2 a la base de datos MySQL en RDS.
- Se creo un [modelo de datos](Modelo.sql).
- Se realizan [consultas].