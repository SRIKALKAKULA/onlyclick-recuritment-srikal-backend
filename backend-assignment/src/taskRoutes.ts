import express, { Request, Response } from "express";
import Task from "./task"; // Ensure correct import
import { authMiddleware, AuthRequest } from "./middleware";

const router = express.Router();

// ✅ Fix: Explicit return type `Promise<void>` and ensure no return inside `async`
router.post("/", authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description, user: req.user }); // Attach user ID
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// ✅ Fix for other routes
router.get("/", authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

router.get("/:id", authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error fetching task" });
  }
});

router.put("/:id", authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true }
    );
    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
});

router.delete("/:id", authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

export default router;
