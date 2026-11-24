# ControlLabs — Sesión 4

API REST con Express 5 y TypeScript. Se completa la capa de servicios de préstamos de la guía SENA ADSO.

## Ejecutar

Requiere Node.js y npm.

```sh
npm ci
npm run build
npm test
npm start
```

Desarrollo: `npm run dev`. Puerto predeterminado: 5000; se puede cambiar con PORT.

## Arquitectura de préstamos

Router → middleware de validación → controlador → LoanService → LoanRepository.
El container crea una sola instancia de InMemoryLoanRepository e inyecta el servicio.
El servicio no depende de Express. Los errores de dominio se convierten a HTTP en el middleware global.

Los préstamos se guardan en un Map y desaparecen al reiniciar el proceso.
No se necesita PostgreSQL para probar préstamos ni health.

## Endpoints

Base: `http://localhost:5000/api/v1`.

| Método | Ruta | Resultado |
| --- | --- | --- |
| GET | /health | Estado del servidor |
| POST | /loans | Crear pendiente, 201 |
| GET | /loans | Listar préstamos |
| GET | /loans/search?roomId=UUID | Filtrar por ambiente |
| GET | /loans/:id | Detalle, 200 o 404 |
| PUT | /loans/:id/accept | Aceptar, 200, 404 o 409 |

POST /loans recibe exclusivamente:

```json
{
  "roomId": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  "instructorId": "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
  "guardaId": "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
  "numeroPc": 3
}
```

Los UUID deben tener formato válido y numeroPc debe ser un entero positivo.
El servidor genera id, estado, createdAt y acceptedAt. No se permite enviarlos en el POST.
Se normalizan los UUID a minúsculas.
La aceptación cambia PENDIENTE_APROBACION a APROBADO_Y_FIRMADO y registra acceptedAt.
Una segunda aceptación devuelve 409, incluso ante dos solicitudes simultáneas.

Las rutas /loans/history y /loans/search se conservan como alias del listado por roomId.
El contrato anterior aula/numeroPC y los filtros room/startDate/endDate ya no forman parte de esta sesión.

## Modelo relacional y alcance

`database/schema.sql` contiene la proyección PostgreSQL de la guía, con PK, FK, CHECK e índices.
Es una propuesta para integración futura; no es una migración del esquema anterior y no se ejecuta automáticamente.
El repositorio en memoria no verifica existencia, roles, capacidad ni disponibilidad en catálogos.
guardaId es un dato de práctica; al implementar autenticación debe obtenerse del usuario verificado.
El préstamo registra cantidad de PCs, sin identificar equipos concretos ni devoluciones individuales.

Los módulos anteriores de usuarios (/users), ambientes (/environments) y equipos (/equipment)
se conservan con sus controladores y esquema PostgreSQL previo. Para usarlos se necesita su base
existente y DB_HOST, DB_PORT, DB_NAME, DB_USER y DB_PASSWORD. No usan el nuevo DDL ni el repositorio
en memoria de préstamos. La expansión de esos módulos es una hoja de ruta de la guía, no una
integración implementada aquí. No hay autenticación ni autorización implementadas.

## Verificación

`npm test` compila y ejecuta pruebas de creación, normalización, filtros, copias independientes,
validación, recursos inexistentes, aceptación concurrente y traducción de errores.
Errores esperados: 400 (entrada inválida), 404 (no existe), 409 (ya aceptado).
Los fallos inesperados devuelven 500 sin exponer detalles internos.

