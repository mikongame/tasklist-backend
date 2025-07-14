# 🧠 Tasklist Backend

API REST + WebSockets para gestionar listas de tareas colaborativas.

## Stack

- Node.js
- Express
- MongoDB Atlas (Mongoose)
- Socket.io

## Funcionalidades

- CRUD completo de listas y tareas
- Relación entre modelos (una lista tiene muchas tareas)
- Comunicación en tiempo real con sockets
- Semilla inicial con `node seed.js`

## Comandos

```bash
npm install       # instalar dependencias
npm run dev       # iniciar el servidor con nodemon
node seed.js      # poblar la base de datos con datos de prueba
