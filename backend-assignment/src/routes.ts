import express from "express";
import { signup, login } from "./controllers";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

//import authRoutes from "./authRoutes";  // Correct path to auth routes
import taskRoutes from "./taskRoutes";  // Correct path to task routes

//const router = express.Router();

//router.use("/auth", authRoutes);   // Base URL: /api/auth
router.use("/tasks", taskRoutes);  // Base URL: /api/tasks


export default router;
