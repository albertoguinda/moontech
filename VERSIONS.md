# Moontech - Versiones y dependencias

## Requisitos globales

- Node.js: >= 20.x
- npm: >= 9.x

---

## BACKEND

**Stack principal:**
- Node.js + Express
- MongoDB Atlas (base: `moontechdb`)
- Mongoose
- TypeScript

**Dependencias:**
- express: ^5.1.0
- mongoose: ^8.15.1
- mongodb: ^6.17.0
- bcryptjs: ^3.0.2
- jsonwebtoken: ^9.0.2
- dotenv: ^16.5.0
- socket.io: ^4.8.1

**Dev:**
- typescript: ^5.8.3
- ts-node: ^10.9.2
- nodemon: ^3.1.10

---

## FRONTEND

**Stack principal:**
- Angular 20
- Tailwind CSS
- RxJS
- socket.io-client

**Dependencias:**
- @angular/core: ^20.0.0
- @angular/forms: ^20.0.0
- @angular/router: ^20.0.0
- rxjs: ~7.8.0
- tailwindcss: ^3.4.4
- socket.io-client: ^4.8.1

**Dev:**
- @angular/cli: ^20.0.1
- typescript: ~5.8.2

---

## Herramientas adicionales

- concurrently: ^8.2.2 (ejecución paralela backend/frontend)