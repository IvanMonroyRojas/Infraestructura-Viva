# S3 y CloudFront – Almacenamiento y Distribución de Contenido Estático

## 1. Objetivo

Este módulo documenta la implementación del almacenamiento de archivos estáticos mediante Amazon S3 y su distribución eficiente a través de Amazon CloudFront. Esta solución permite ofrecer una página web accesible públicamente, con alta disponibilidad y rendimiento optimizado.

---

## 2. Configuración del Bucket S3

- **Nombre del bucket:** `pagina-web-acme`
- **Región:** us-east-1
- **Tipo de contenido:** Página web estática
- **Archivos cargados:** `index.html`, `style.css`, imágenes, entre otros.

### Configuraciones aplicadas:

- Activación del hosting estático (Static Website Hosting)
- Permisos públicos habilitados para permitir acceso anónimo al contenido
- Política de bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::pagina-web-acme/*"
    }
  ]
}
```

## 3. Subida de archivos al bucket S3

- Se subieron los archivos `index-S3.html`, `logo.jpg` y `style.css` al bucket S3 configurado para hosting estático.
- Esto permite que la página web y sus recursos asociados estén disponibles para su distribución y acceso público.


## 4. Configuración de CloudFront

- **Origen:** Bucket S3 (`pagina-web-acme`)
- **Comportamiento:** Redirección de `/` a `index.html`
- **Distribución:** Habilitada con acceso público

> **Nota:** La configuración de CloudFront no se pudo implementar completamente debido a restricciones de permisos en AWS Academy.

## 5. Configuración del Bucket para Archivado

- **Nombre del bucket:** `bucket-glacier-portafolio-modulo-4`
- **Región:** us-east-1
- **Acceso:** Sin acceso público
- **Versionamiento:** Activado
- **Tipo de almacenamiento:** Archivado (Glacier)
- **Propósito:** Almacenamiento de archivos antiguos para respaldo seguro y control de versiones

## 6. Replicación y Archivado

- **Bucket destino:** `pagina-web-acme-glacier`
- **Clase de almacenamiento:** S3 Glacier
- **Propósito:** Copia de seguridad automatizada de archivos estáticos
- **Ventaja:** Reducción de costos en datos poco accedidos