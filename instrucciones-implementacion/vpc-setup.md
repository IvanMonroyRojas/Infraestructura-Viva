# Configuración de la VPC

## 1. Creación de la VPC

- **Nombre:** `vpc-portafolio-modulo-4`
- **CIDR:** `10.0.0.0/16`
- **Región:** us-east-1

## 2. Subredes

- **Subred pública (us-east-1a):**  
  - CIDR: `10.0.1.0/24`  
  - Asociada a tabla de rutas con Internet Gateway  
  - Permite acceso público a recursos (EC2, ALB)

- **Subred privada (us-east-1a):**  
  - CIDR: `10.0.2.0/24`  
  - Sin ruta a Internet Gateway  
  - Recursos accesibles solo desde subred pública

- **Subred pública (us-east-1b):**  
  - CIDR: `10.0.3.0/24`  
  - Asociada a tabla de rutas con Internet Gateway

- **Subred privada (us-east-1b):**  
  - CIDR: `10.0.4.0/24`

## 3. Internet Gateway (IGW)

- Asociado a la VPC para permitir tráfico de entrada y salida a Internet desde subredes públicas.

## 4. Tablas de rutas

- **Tabla de rutas públicas:**  
  - Ruta 0.0.0.0/0 a IGW  
  - Asociada a subredes públicas

- **Tabla de rutas privadas:**  
  - Sin ruta a IGW  
  - Asociada a subredes privadas

## 5. Grupos de Seguridad

- **Grupo de seguridad para EC2:**  
  - Permite tráfico HTTP (puerto 80) desde cualquier IP  
  - Permite tráfico RDP/SSH (según SO) desde IPs específicas

- **Grupo de seguridad para RDS:**  
  - Permite tráfico MySQL (puerto 3306) solo desde grupo de seguridad EC2


## 6. Balanceador de carga (Application Load Balancer - ALB)

- Distribuye tráfico HTTP entrante a las instancias EC2 en subred pública (us-east-1a)  
- Asociado a subredes públicas en ambas zonas de disponibilidad  
- Configurado con grupo de destino apuntando a la instancia EC2