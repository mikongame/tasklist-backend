import express from "express";
import Task from "../models/Task.js";
import List from "../models/List.js";

const router = express.Router();

// GET todas las tareas
router.get("/", async (req, res) => {
  const tasks = await Task.find().populate("list");
  res.json(tasks);
});

// GET una tarea por ID
router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id).populate("list");
  if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
  res.json(task);
});

// POST nueva tarea (y añadirla a la lista)
router.post("/", async (req, res) => {
  const { content, listId } = req.body;

  const task = await Task.create({ content, list: listId });
  await List.findByIdAndUpdate(listId, { $addToSet: { tasks: task._id } });

  res.status(201).json(task);
});

// PUT editar tarea
router.put("/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Tarea no encontrada" });
  res.json(updated);
});

// DELETE eliminar tarea (y quitarla de la lista)
router.delete("/:id", async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (task) {
    await List.findByIdAndUpdate(task.list, { $pull: { tasks: task._id } });
  }
  res.json({ message: "Tarea eliminada" });
});

export default router;
