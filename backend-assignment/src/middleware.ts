import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: string; // Attach user ID after decoding token
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; // Get token from header
    if (!token) {
      res.status(401).json({ message: "Access denied. No token provided." });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = (decoded as { id: string }).id; // Attach user ID

    next(); // ✅ Move to the next middleware
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};
