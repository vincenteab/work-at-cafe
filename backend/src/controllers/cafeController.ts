import { Request, Response } from "express";
import {
  getCafes,
  getCafe,
  createCafe,
  deleteCafe,
  updateCafe,
} from "../services/cafeService";

export async function listCafes(req: Request, res: Response) {
  try {
    const cafes = await getCafes();
    return res.status(200).json(cafes);
  } catch (error: unknown) {
    console.error("Failed to list cafes:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function listCafe(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const cafe = await getCafe(id);
    return res.status(200).json(cafe);
  } catch (error: unknown) {
    console.error("Failed to list cafe:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function addCafes(req: Request, res: Response) {
  try {
    const { name, latitude, longitude, userId } = req.body ?? {};

    if (
      typeof name !== "string" ||
      name.trim().length === 0 ||
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      return res.status(400).json({ error: "Invalid cafe payload" });
    }

    const cafe = await createCafe({
      name: name.trim(),
      latitude,
      longitude,
      userId,
    });
    return res.status(201).json(cafe);
  } catch (error: unknown) {
    console.error("Failed to create cafe:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function modifyCafe(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    if (!Number.isInteger(id) || id <= 0 || data === null) {
      return res.status(400).json({ error: "Invalid update payload" });
    }

    const allowedData: {
      name?: string;
      latitude?: number;
      longitude?: number;
    } = {};

    if ("name" in data) {
      if (typeof data.name !== "string" || data.name.trim().length === 0) {
        return res.status(400).json({ error: "Invalid name" });
      }
      allowedData.name = data.name.trim();
    }

    if ("latitude" in data) {
      if (typeof data.latitude !== "number") {
        return res.status(400).json({ error: "Invalid latitude" });
      }
      allowedData.latitude = data.latitude;
    }

    if ("longitude" in data) {
      if (typeof data.longitude !== "number") {
        return res.status(400).json({ error: "Invalid longitude" });
      }
      allowedData.longitude = data.longitude;
    }

    if (Object.keys(allowedData).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    const cafe = await updateCafe(id, allowedData);
    return res.status(200).json(cafe);
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2025"
    ) {
      return res.status(404).json({ error: "Cafe not found" });
    }

    console.error("Failed to update cafe:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function removeCafe(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid cafe id" });
    }

    const cafe = await deleteCafe(id);
    return res.status(200).json(cafe);
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2025"
    ) {
      return res.status(404).json({ error: "Cafe not found" });
    }

    console.error("Failed to delete cafe:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
