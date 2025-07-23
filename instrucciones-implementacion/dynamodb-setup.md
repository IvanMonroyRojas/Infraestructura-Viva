# Configuración de DynamoDB

## 1. Objetivo

El propósito de esta configuración es que la instancia EC2 pueda interactuar con una base de datos NoSQL utilizando el servicio **Amazon DynamoDB**, aplicando operaciones CRUD mediante código en Python utilizando **boto3**.

## 2. Configuración de la tabla

- **Nombre de la tabla:** `Portafolio-modulo-4-inventario_activos`
- **Clave primaria:**
  - **Partition Key:** `id` (string)
- **Modo de capacidad:** Bajo demanda
- **Región:** us-east-1
- **Estado:** Tabla creada correctamente
- **Índices secundarios:** No aplican
- **Flujo de datos (streams):** Deshabilitado

## 3. Interacción con EC2

- La idea original era acceder a DynamoDB desde una aplicación en Python alojada en la instancia EC2, utilizando el SDK oficial de AWS (`boto3`).
- El código se pensaba ejecutar desde un script o servidor web que gestionara productos o inventario.

### Ejemplo teórico de código:

```python
import boto3

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

tabla = dynamodb.Table('productos')

# Crear nuevo producto
tabla.put_item(
    Item={
        'id': '001',
        'nombre': 'Notebook',
        'stock': 12
    }
)

# Leer productos
response = tabla.scan()
for item in response['Items']:
    print(item)
```

## 4. Índice Secundario Global (GSI)

Se crea el índice **`departamento-estado-index`** que permite realizar consultas eficientes para obtener todos los activos de un determinado departamento que estén en un estado específico.

- **Nombre del índice:** `departamento-estado-index`
- **Partition Key:** `departamento` (string)
- **Sort Key:** `estado` (string)
- **Proyección:** All (todas las columnas)
- **Utilidad:** Permite consultar activos filtrando por departamento y estado, por ejemplo, todos los activos "En uso" del departamento de "TI".


## 5. Limitación en AWS Academy
⚠️ Nota: Debido a las restricciones de permisos en AWS Academy, no fue posible asignar roles a la instancia EC2, por lo tanto, no se logró realizar la integración efectiva con DynamoDB.
La implementación queda como propuesta teórica, documentando el flujo y el ejemplo de uso para una cuenta con permisos completos.