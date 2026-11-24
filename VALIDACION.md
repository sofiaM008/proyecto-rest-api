# Validación de la entrega

Se ejecutaron cinco pruebas de lógica y middleware con Node.js 24.14.0:

- Creación pendiente, normalización de UUID, filtros y protección de copias.
- Rechazo de cantidades inválidas, filtros incorrectos y préstamos inexistentes.
- Aceptación concurrente: una operación exitosa y otra con CONFLICT.
- Validación del cuerpo HTTP y rechazo de campos controlados por el servidor.
- Conversión de errores de dominio y JSON malformado a 400, 404 y 409.

Resultado: 5 pruebas aprobadas, 0 fallidas.

La ejecución local usó la transformación de TypeScript de Node para los archivos de estas pruebas.
No sustituye la comprobación de tipos de TypeScript ni una prueba HTTP con Express.
No se pudo completar npm ci: faltan paquetes en caché y el entorno no tiene conexión al registro.
Por esta razón quedan pendientes npm run build, npm test y la comprobación HTTP con las dependencias instaladas.
El SQL es una proyección de diseño y no se ejecutó contra PostgreSQL.
Los módulos previos de usuarios, ambientes y equipos no se probaron contra su base de datos.

La subida a GitHub queda pendiente: el entorno no puede resolver github.com y no hay una conexión
de GitHub disponible. No se ha publicado ni modificado el repositorio remoto.
