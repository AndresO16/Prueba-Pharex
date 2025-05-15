# Prueba-Pharex
Desarrollo de prueba de conocimiento
Gestor de Tareas

Aplicación web desarrollada con Laravel 12, React e Inertia.js, que permite a los usuarios registrarse, crear listas de tareas, gestionar tareas y visualizar estadísticas de productividad.

---

Características

- Autenticación de usuarios (registro, login, logout)
- CRUD de listas de tareas
- CRUD de tareas con asignación a listas
- Filtros por estado (pendientes, completadas)
- Búsqueda de tareas
- Dashboard con estadísticas por usuario
- Interfaz moderna y responsiva (React + Tailwind CSS)
- Flash messages para retroalimentación visual

---

---

Estructura del proyecto

- app/Http/Controllers: Controladores de Laravel
- resources/js/Pages: Vistas construidas con React + Inertia
- routes/web.php: Definición de rutas del sistema
- database/migrations: Migraciones de la base de datos

---

Requisitos del sistema

- PHP >= 8.2
- Composer
- Node.js >= 18
- NPM o Yarn
- MySQL
- Laravel 12

---

Instalación del sistema

- Clonar el repositorio de github con el siguiente comando: https://github.com/AndresO16/Prueba-Pharex.git
- Instalar dependencias PHP con el siguiente comando: composer install
- Instalar dependencias del frontend con el siguiente comando: npm install
- Crear la base de datos "gestor_tareas"
- Editar el archivo .dev para configurar la conexión a la base de datos que se vaya a utilizar, en este caso se uso la siguiente configuración:
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=gestor_tareas
    DB_USERNAME=root
    DB_PASSWORD=
- Ejecutar las migraciones para la base de datos con el siguiente comando: php artisan migrate
- Levantar el servidor de Laravel con el siguiente comando: php artisan serve
- Levantar el Frontend (react) con el siguiente comando: npm run dev

---

Tecnologías utilizadas

| Tecnología       | Motivo de uso                                                                 |
|------------------|--------------------------------------------------------------------------------|
| Laravel 12   | Framework robusto y moderno para construir APIs y lógica de backend rápida y segura. Proporciona autenticación, migraciones, validaciones y manejo de rutas de forma eficiente. |
| Inertia.js   | Puente entre Laravel y React que permite usar React como frontend sin convertir el proyecto en una SPA completa. Facilita el desarrollo sin complicaciones de APIs separadas. |
| React        | Librería moderna de JavaScript para construir interfaces de usuario reactivas, rápidas y mantenibles. Ideal para una experiencia de usuario fluida. |
| MySQL        | Base de datos relacional, robusta y ampliamente soportada, utilizada para persistencia estructurada de listas y tareas. |
| Vite         | Herramienta moderna de build que permite una experiencia de desarrollo rápida y optimizada. |
| Tailwind CSS | Framework de estilos utilitario que permite construir interfaces modernas sin salir del HTML/JSX. |

Estas tecnologías fueron elegidas para lograr una arquitectura desacoplada, escalable, con buena experiencia de usuario y rápido desarrollo.

---

- API de Autenticación de usuario
    1. GET /login
    Descripción: Muestra la página de inicio de sesión para el usuario.
    Método HTTP: GET
    Ruta: /login
    Requiere autenticación: ❌ No
    Parámetros:
    Ninguno directamente en la solicitud.
    Respuesta:
    Renderiza la vista auth/login mediante Inertia.js.
    Datos adicionales:
    canResetPassword: boolean (si existe la ruta de recuperación de contraseña).
    status: mensaje de estado de la sesión (si existe).

    2. POST /login
    Descripción: Procesa la solicitud de inicio de sesión del usuario.
    Método HTTP: POST
    Ruta: /login
    Requiere autenticación: ❌ No
    Parámetros (body):
    email: string (correo electrónico del usuario).
    password: string (contraseña del usuario).
    
    Validación:
    Se realiza mediante LoginRequest, que probablemente valida email y contraseña.
    Respuesta:
    Si es exitoso: redirecciona a la ruta dashboard.
    Regenera la sesión para evitar ataques de fijación de sesión.

    3. POST /logout
    Descripción: Cierra la sesión del usuario autenticado.
    Método HTTP: POST
    Ruta: /logout
    Requiere autenticación: ✅ Sí
    Parámetros:
    Ninguno.
    Respuesta:
    Elimina la sesión activa.
    Redirecciona a /.

- API de Registro de Usuarios
    1. GET /register
    Descripción: Muestra la página de registro para nuevos usuarios.
    Método HTTP: GET
    Ruta: /register
    Requiere autenticación: ❌ No
    Parámetros: Ninguno.
    Respuesta:
    Renderiza la vista auth/register con Inertia.js.

    2. POST /register
    Descripción: Registra un nuevo usuario en el sistema.
    Método HTTP: POST
    Ruta: /register
    Requiere autenticación: ❌ No
    Parámetros (body):
    name: string — Nombre del usuario (requerido).
    email: string — Correo electrónico único y en minúsculas (requerido).
    password: string — Contraseña (requerida).
    password_confirmation: string — Confirmación de la contraseña (requerida).
    Validaciones:
    El correo debe ser único y válido.
    La contraseña debe cumplir con las reglas por defecto de Laravel (Rules\Password::defaults()).
    Respuesta si es exitoso:
    Crea el usuario.
    Lanza el evento Registered.
    Autentica al usuario.
    Redirige al dashboard (/dashboard o la ruta configurada como tal).

- API de Gestión de Listas de Tareas
    Todas estas rutas requieren autenticación.
    
    1. GET /lists
    Descripción: Muestra todas las listas creadas por el usuario autenticado.
    Método HTTP: GET
    Ruta: /lists
    Requiere autenticación: ✅ Sí
    Parámetros: Ninguno.
    Respuesta:
    Renderiza la vista lists/Index con:
    lists: arreglo de listas del usuario.
    flash.success y flash.error: mensajes de sesión (opcional).

    2. POST /lists
    Descripción: Crea una nueva lista de tareas para el usuario autenticado.
    Método HTTP: POST
    Ruta: /lists
    Requiere autenticación: ✅ Sí
    Parámetros (body):
    title: string — Título de la lista (obligatorio, máx. 255).
    description: string|null — Descripción (opcional).
    Respuesta:
    Redirecciona a /lists con un mensaje de éxito en sesión.

    3. PUT /lists/{id}
    Descripción: Actualiza una lista existente del usuario.
    Método HTTP: PUT o PATCH
    Ruta: /lists/{id}
    Requiere autenticación: ✅ Sí
    Parámetros (path):
    id: int — ID de la lista.
    Parámetros (body):
    title: string — Nuevo título (obligatorio, máx. 255).
    description: string|null — Nueva descripción (opcional).
    Respuesta:
    Redirecciona a /lists con mensaje de éxito.
    
    4. DELETE /lists/{id}
    Descripción: Elimina una lista de tareas del usuario.
    Método HTTP: DELETE
    Ruta: /lists/{id}
    Requiere autenticación: ✅ Sí
    Parámetros (path):
    id: int — ID de la lista.
    Respuesta:
    Redirecciona a /lists con mensaje de éxito.

- API de Gestión de Tareas
    Todas las rutas requieren un usuario autenticado. Las tareas están asociadas a listas, que a su vez pertenecen a un usuario.

    1. GET /tasks
    Descripción: Lista todas las tareas del usuario autenticado, con filtros y paginación.
    Método HTTP: GET
    Ruta: /tasks
    Requiere autenticación: ✅ Sí
    Query Params (opcionales):
    search: string — Busca por título o descripción.
    filter: string — "all" (por defecto), "completed" o "pending".
    page: int — Paginación.
    Respuesta:
    Renderiza tasks/Index con:
    tasks: tareas paginadas del usuario.
    lists: listas del usuario.
    filters: filtros aplicados.
    flash: mensajes de sesión.

    2. POST /tasks
    Descripción: Crea una nueva tarea en una lista del usuario autenticado.
    Método HTTP: POST
    Ruta: /tasks
    Requiere autenticación: ✅ Sí
    Parámetros (body):
    title: string — Título de la tarea (obligatorio, máx. 255).
    description: string|null — Descripción (opcional).
    due_date: date|null — Fecha de vencimiento (opcional).
    list_id: int — ID de la lista a la que pertenece (obligatorio y debe ser del usuario).
    is_complete: boolean — Estado de completitud (opcional, por defecto false).
    Respuesta:
    Redirecciona a /tasks con mensaje de éxito.

    3. PUT /tasks/{id}
    Descripción: Actualiza una tarea específica del usuario.
    Método HTTP: PUT o PATCH
    Ruta: /tasks/{id}
    Requiere autenticación: ✅ Sí
    Parámetros (path):
    id: int — ID de la tarea a actualizar.
    Parámetros (body):
    title: string
    description: string|null
    due_date: date|null
    is_complete: boolean
    list_id: int — ID de la lista a la que pertenece.
    Respuesta:
    Redirecciona a /tasks con mensaje de éxito.

    4. DELETE /tasks/{id}
    Descripción: Elimina una tarea específica.
    Método HTTP: DELETE
    Ruta: /tasks/{id}
    Requiere autenticación: ✅ Sí
    Parámetros (path):
    id: int — ID de la tarea.
    Respuesta:
    Redirecciona a /tasks con mensaje de éxito.

Este proyecto fue desarrollado por Carlos Olarte
