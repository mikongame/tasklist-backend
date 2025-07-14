import express from "express";
import List from "../models/List.js";
import Task from "../models/Task.js";

const router = express.Router();

// GET todas las listas
router.get("/", async (req, res) => {
  const lists = await List.find().populate("tasks");
  res.json(lists);
});

// GET una lista por ID (con tareas)
router.get("/:id", async (req, res) => {
  const list = await List.findById(req.params.id).populate("tasks");
  if (!list) return res.status(404).json({ message: "Lista no encontrada" });
  res.json(list);
});

// POST nueva lista
router.post("/", async (req, res) => {
  const { name, description } = req.body;
  const nueva = await List.create({ name, description });
  res.status(201).json(nueva);
});

// PUT editar lista
router.put("/:id", async (req, res) => {
  const updated = await List.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Lista no encontrada" });
  res.json(updated);
});

// DELETE eliminar lista (no borra las tareas asociadas)
router.delete("/:id", async (req, res) => {
  await List.findByIdAndDelete(req.params.id);
  res.json({ message: "Lista eliminada" });
});

export default router;
