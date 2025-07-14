import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";

// Cargar variables de entorno
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // o especifica: "http://localhost:5173"
    methods: ["GET", "POST"]
  }
});

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error de conexión a MongoDB:", err));

// Rutas (se rellenarán luego)
import listRoutes from "./routes/lists.js";
import taskRoutes from "./routes/tasks.js";

app.use("/lists", listRoutes);
app.use("/tasks", taskRoutes);

// WebSockets
io.on("connection", (socket) => {
  console.log("🔌 Usuario conectado");

  socket.on("disconnect", () => {
    console.log("❌ Usuario desconectado");
  });

  // Ejemplo de evento para tareas
  socket.on("new-task", (data) => {
    console.log("📩 Nueva tarea recibida por socket:", data);
    io.emit("task-added", data); // reenviamos a todos
  });
});

// Arrancar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
