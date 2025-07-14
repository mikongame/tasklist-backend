import mongoose from "mongoose";
import dotenv from "dotenv";
import List from "./models/List.js";
import Task from "./models/Task.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a MongoDB para semilla");

    // Eliminar datos anteriores
    await Task.deleteMany();
    await List.deleteMany();

    // Crear listas
    const lista1 = await List.create({
      name: "Lista de compras",
      description: "Cosas para comprar esta semana"
    });

    const lista2 = await List.create({
      name: "Tareas del proyecto",
      description: "Entrega para el bootcamp"
    });

    // Crear tareas y asignarlas a listas
    const tarea1 = await Task.create({ content: "Leche", list: lista1._id });
    const tarea2 = await Task.create({ content: "Pan", list: lista1._id });
    const tarea3 = await Task.create({ content: "Terminar backend", list: lista2._id });

    // Vincular tareas a sus listas
    await List.findByIdAndUpdate(lista1._id, { $push: { tasks: { $each: [tarea1._id, tarea2._id] } } });
    await List.findByIdAndUpdate(lista2._id, { $push: { tasks: tarea3._id } });

    console.log("🌱 Base de datos poblada correctamente");
    process.exit();

  } catch (error) {
    console.error("❌ Error al ejecutar semilla:", error);
    process.exit(1);
  }
};

seed();
