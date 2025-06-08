# Moontech - Prueba Técnica Fullstack

Aplicación fullstack con autenticación, CRUD de usuarios y registro de logs de conexiones, desarrollada para Moontech.  
Backend en Node.js + Express, base de datos MongoDB Atlas, frontend en Angular.

---

## Estructura de carpetas

```bash

prueba-tecnica-moontech/
│
├── backend/
│ ├── package.json
│ ├── tsconfig.json
│ ├── .env.example
│ └── src/
│ ├── app.ts
│ ├── index.ts
│ ├── controllers/
│ │ ├── authController.ts
│ │ ├── logController.ts
│ │ └── userController.ts
│ ├── middleware/
│ │ └── authMiddleware.ts
│ ├── models/
│ │ ├── Log.ts
│ │ └── User.ts
│ ├── routes/
│ │ ├── auth.ts
│ │ ├── logs.ts
│ │ └── users.ts
│ └── utils/
│ ├── db.ts
│ └── seed.ts
│
├── frontend/
│ ├── package.json
│ ├── angular.json
│ ├── tailwind.config.js
│ └── src/
│ ├── app/
│ │ ├── app.config.ts
│ │ ├── app.html
│ │ ├── app.routes.ts
│ │ ├── app.spec.ts
│ │ ├── app.ts
│ │ ├── guards/
│ │ │ └── auth.guard.ts
│ │ ├── interceptors/
│ │ │ └── token.interceptor.ts
│ │ ├── pages/
│ │ │ ├── login/
│ │ │ │ ├── login.html
│ │ │ │ ├── login.spec.ts
│ │ │ │ └── login.ts
│ │ │ ├── logs/
│ │ │ │ ├── logs.html
│ │ │ │ └── logs.ts
│ │ │ └── users/
│ │ │ ├── users.html
│ │ │ ├── users.spec.ts
│ │ │ └── users.ts
│ │ └── services/
│ │ ├── auth.service.ts
│ │ ├── logs.service.ts
│ │ ├── socket.service.ts
│ │ └── users.service.ts
│ ├── index.html
│ ├── main.ts
│ └── styles.css
│ └── public/
│ ├── apple-touch-icon.png
│ ├── favicon.ico
│ ├── favicon-96x96.png
│ ├── favicon.svg
│ ├── site.webmanifest
│ ├── web-app-manifest-192x192.png
│ └── web-app-manifest-512x512.png
│
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── README.md
└── VERSIONS.md

```

---

## Instalación y ejecución

1. **Clona el repositorio**  
   (Solicita acceso como colaborador con tu usuario de GitHub para poder descargar el repositorio privado)
    ```bash
    git clone https://github.com/albertoguinda/moontech.git
    cd moontech
    ```

2. **Instala dependencias**
    ```bash
    cd backend
    npm install

    cd ../frontend
    npm install

    cd ..
    ```

3. **Configura variables de entorno**
    - Copia `/backend/.env.example` como `/backend/.env`.
    - Rellena tus credenciales de MongoDB Atlas y tu secreto JWT:
    ```
    MONGO_URI="mongodb+srv://<USUARIO>:<PASSWORD>@moontechdb.egm3v4k.mongodb.net/moontechdb?retryWrites=true&w=majority&appName=moontechdb"
    JWT_SECRET=pon_un_secreto_robusto
    PORT=3000
    ```

4. **Pobla la base de datos con el usuario administrador**
    ```bash
    cd backend
    npx ts-node src/utils/seed.ts
    cd ..
    ```
    - Usuario creado:  
      **admin@moontech.com**  
      **Contraseña:** 123456

5. **Inicia backend y frontend**
    ```bash
    npm start
    ```
    - Backend: http://localhost:3000  
    - Frontend: http://localhost:4200

---

## Funcionalidad

- Autenticación JWT
- CRUD de usuarios
- Registro de logs de conexión (login/logout)
- Contraseñas encriptadas
- Variables de entorno para configuración
- Comunicación en tiempo real con WebSockets
- Frontend Angular con guards, interceptors y formularios reactivos

---

## Notas

- Base de datos: MongoDB Atlas, base `moontechdb`, colecciones `users` y `logs`.
- Todo el código sigue buenas prácticas de arquitectura y seguridad.
- Consulta VERSIONS.md para versiones y dependencias detalladas.
- Para cualquier duda técnica o de acceso, contacta conmigo en [albertoguinda@gmail.com](mailto:albertoguinda@gmail.com).

---

## Autor

[Alberto Guinda Sevilla - LinkedIn](https://www.linkedin.com/in/albertoguindasevilla/)