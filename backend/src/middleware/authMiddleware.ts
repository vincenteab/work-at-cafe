import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Express Request to include custom user payload
export interface AuthRequest extends Request {
  user?: { userId: number };
}

export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  // Extract the token from the "Authorization" header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  // grab the actual token
  const token = authHeader.split(" ")[1];

  try {
    // Verify token using secret key
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
    };

    req.user = payload;

    // let the request continue to the controller
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};
