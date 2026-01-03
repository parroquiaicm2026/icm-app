# Manual de Edición - ICM Parroquia CMS

Este documento describe cómo gestionar el contenido de la aplicación utilizando el sistema de administración (CMS).

## Acceso al Panel
1. Ingrese a `www.tudominio.com/admin` (o `localhost:5173/admin` en desarrollo).
2. Inicie sesión con sus credenciales de Netlify Identity (si es la primera vez, deberá haber recibido una invitación por correo).

## Gestión de Contenidos

El panel de administración está dividido en "Colecciones". A continuación se detalla cada una:

### 1. Novedades (News)
Aquí se publican las noticias que aparecen en la sección principal.
- **Título**: El titular de la noticia.
- **Fecha/Tiempo**: Texto libre, ej: "Hoy", "Hace 2 días", "15 Nov".
- **Categoría**: Etiqueta breve, ej: "GENERAL", "CATEQUESIS", "DESTACADO".
- **Descripción**: El cuerpo de la noticia.
- **Destacado (Switch)**: Si se activa, la noticia aparecerá en grande en la parte superior.
- **Color**: Variable CSS para el tema, ej: `var(--color-martyr-red)`.

### 2. Eventos del Calendario
Eventos que aparecen en la agenda.
- **Título**: Nombre del evento.
- **Fecha**: Seleccione la fecha exacta en el calendario.
- **Tipo**: Clasificación litúrgica (Solemnidad, Fiesta, etc.).
- **Categoría**: 'diocese' o 'svd'.
- **Descripción**: Detalles opcionales.

### 3. Sacramentos
Información estática sobre Bautismos, Comuniones, etc.
- Edite el título y la lista de detalles (requisitos, horarios).

### 4. Equipo Organizador
Gestione los miembros del equipo pastoral (Párroco, Vicarios, etc.).
- Suba fotos y actualice nombres/roles.

### 5. Configuración General
- **Información de la Parroquia**: Actualice horarios de misa, dirección, teléfono y nombre de la parroquia.

## Publicación de Cambios
1. Una vez realizado un cambio, haga clic en el botón **"Publish"** (Publicar) en la barra superior verde.
2. Seleccione **"Publish now"**.
3. El sistema guardará los cambios y actualizará la página automáticamente tras unos momentos (Netlify Deploy).
