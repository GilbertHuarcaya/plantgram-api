# Plantgram API

API para la red social de plantas Plantgram.

## Quick start

1. Copy `.env.example` to `.env` and set `MONGO_URI` and optionally `PORT` and `JWT_SECRET`.

2. Install dependencies:

```bash
npm install
```

3. Run the server:

```bash
npm start
# or for development
npm run dev
```

4. Seed the database (optional):

```bash
npm run seed
```

## Endpoints

### Health Check
- GET `/` => health check

### Authentication
- POST `/api/auth/signup` - Registrar nuevo usuario
  - Body: `{ username, email, password, full_name?, bio?, profile_pic? }`
  - Returns: `{ ok, message, token, user }`

- POST `/api/auth/login` - Iniciar sesión
  - Body: `{ email, password }`
  - Returns: `{ ok, message, token, user }`

- GET `/api/auth/verify` - Verificar token
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ ok, user }`

### Users
- GET `/api/users` - Obtener todos los usuarios
- POST `/api/users` - Crear usuario
- GET `/api/users/:id` - Obtener usuario por ID
- PUT `/api/users/:id` - Actualizar usuario
- DELETE `/api/users/:id` - Eliminar usuario

### Posts
- GET `/api/posts` - Obtener posts (paginado: `?page=&limit=`)
- POST `/api/posts` - Crear post
- GET `/api/posts/:id` - Obtener post por ID
- PUT `/api/posts/:id` - Actualizar post
- DELETE `/api/posts/:id` - Eliminar post

### Species
- GET `/api/species` - Obtener todas las especies
- POST `/api/species` - Crear especie
- GET `/api/species/:id` - Obtener especie por ID
- PUT `/api/species/:id` - Actualizar especie
- DELETE `/api/species/:id` - Eliminar especie

### Comments
- GET `/api/comments` - Obtener comentarios
- POST `/api/comments` - Crear comentario
- GET `/api/comments/:id` - Obtener comentario por ID
- DELETE `/api/comments/:id` - Eliminar comentario

### Follows
- GET `/api/follows` - Obtener follows
- POST `/api/follows` - Crear follow
- DELETE `/api/follows/:id` - Eliminar follow

### Likes
- GET `/api/likes` - Obtener likes
- POST `/api/likes` - Crear like
- DELETE `/api/likes/:id` - Eliminar like

### Saves
- GET `/api/saves` - Obtener posts guardados
- POST `/api/saves` - Guardar post
- DELETE `/api/saves/:id` - Eliminar guardado

### Notifications
- GET `/api/notifications` - Obtener notificaciones
- PUT `/api/notifications/:id` - Marcar notificación como leída
- DELETE `/api/notifications/:id` - Eliminar notificación

### Plant Profiles
- GET `/api/plant-profiles` - Obtener perfiles de plantas
- POST `/api/plant-profiles` - Crear perfil de planta
- GET `/api/plant-profiles/:id` - Obtener perfil por ID
- PUT `/api/plant-profiles/:id` - Actualizar perfil
- DELETE `/api/plant-profiles/:id` - Eliminar perfil

### Upload (Requiere autenticación)
- POST `/api/upload/single` - Subir una imagen
  - Headers: `Authorization: Bearer <token>`
  - Body: FormData con campo `image`
  - Returns: `{ ok, message, imageUrl, filename, size, mimetype }`

- POST `/api/upload/multiple` - Subir múltiples imágenes (máx. 10)
  - Headers: `Authorization: Bearer <token>`
  - Body: FormData con campo `images`
  - Returns: `{ ok, message, images[], count }`

- DELETE `/api/upload/:filename` - Eliminar imagen
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ ok, message, filename }`

- GET `/api/upload/:filename` - Obtener imagen (público)

## Variables de Entorno

```env
MONGO_URI=mongodb://localhost:27017/plantgram
PORT=3000
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

## Notas

- Las imágenes se almacenan en la carpeta `uploads/`
- Tamaño máximo de imagen: 5MB
- Formatos permitidos: jpeg, jpg, png, gif, webp
- El token JWT debe enviarse en el header: `Authorization: Bearer <token>`
