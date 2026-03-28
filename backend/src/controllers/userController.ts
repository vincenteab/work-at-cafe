import { Request, Response } from "express";
import {
  getUser,
  updateUser,
  createUser,
  getUsers,
  deleteUser,
} from "../services/userService";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const newUser = await createUser({ email, name, password });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export async function listUsers(req: Request, res: Response) {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error: unknown) {
    console.error("Failed to list users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function listUser(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const user = await getUser(id);
    return res.status(200).json(user);
  } catch (error: unknown) {
    console.error("Failed to list user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function modifyUser(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    if (!Number.isInteger(id) || id <= 0 || data === null) {
      return res.status(400).json({ error: "Invalid update payload" });
    }

    const allowedData: {
      email?: string;
      name?: string;
    } = {};

    if ("name" in data) {
      if (typeof data.name !== "string" || data.name.trim().length === 0) {
        return res.status(400).json({ error: "Invalid name" });
      }
      allowedData.name = data.name.trim();
    }

    if (Object.keys(allowedData).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    const user = await updateUser(id, allowedData);
    return res.status(200).json(user);
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2025"
    ) {
      return res.status(404).json({ error: "User not found" });
    }

    console.error("Failed to update user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function removeUser(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    const user = await deleteUser(id);
    return res.status(200).json(user);
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2025"
    ) {
      return res.status(404).json({ error: "User not found" });
    }

    console.error("Failed to delete user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
