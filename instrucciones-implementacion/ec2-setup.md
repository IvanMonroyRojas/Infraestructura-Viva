# Configuración de la Instancia EC2

## 1. Creación de la instancia

- **Nombre:** `server-web`
- **AMI utilizada:** Microsoft Windows Server 2022 Base (Free Tier elegible)
- **Tipo de instancia:** `t3.micro`
- **Par de llaves (Key Pair):** `portafolio-key`
- **Subred:** Subred pública en `us-east-1a`
- **Grupo de seguridad:**  
  - Puerto 80 (HTTP) abierto a 0.0.0.0/0  
  - Puerto RDP (3389) restringido a IP local  
- **Dirección IP elástica (EIP):** Asociada para acceso público fijo

## 2. Configuración del servidor web IIS

Una vez accedida la instancia vía RDP:

- **Instalación de IIS:**
  1. Abrir "Server Manager"
  2. Agregar Roles y Características
  3. Seleccionar `Web Server (IIS)`
  4. Completar instalación y reiniciar si es necesario

- **Publicación del sitio web:**
  - Reemplazo del archivo `iisstart.htm` por una versión personalizada (archivo `index-EC2.html`)
  - Directorio: `C:\inetpub\wwwroot`
  - Se despliega una página que simula la visualización de inventario

## 3. Prueba de carga con Apache Benchmark (ab)

Desde otra máquina (Linux local o EC2 temporal):

Instalación de Apache Bench en Windows
Se descarga una versión de Apache para Windows, por ejemplo desde:
https://www.apachelounge.com/download/

Se extrae el contenido en una carpeta.

Se abre una terminal PowerShell o CMD, y se navega a la carpeta bin:

```bash
cd C:\Apache24\bin
```

```bash
ab -n 1000 -c 100 http://<IP-PUBLICA-EC2>/
```

Parámetros:

- -n 1000: total de 1000 peticiones

- -c 100: 100 peticiones concurrentes

Resultado esperado:

- Tiempos de respuesta por petición

- Solicitudes por segundo

- Conexiones fallidas (si las hubiera)