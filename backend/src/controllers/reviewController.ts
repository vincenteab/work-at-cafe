import { Request, Response } from "express";
import {
  getReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
} from "../services/reviewService";

export async function listReviews(req: Request, res: Response) {
  try {
    const reviews = await getReviews();

    return res.status(200).json(reviews);
  } catch (error: unknown) {
    console.error("Failed to list reviews:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function listReview(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const review = await getReview(id);
    return res.status(200).json(review);
  } catch (error: unknown) {
    console.error("Failed to list review:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function addReview(req: Request, res: Response) {
  try {
    const { text, rating, wifiRating, hasOutlets, noiseLevel, cafeId } =
      req.body ?? {};

    if (
      typeof text !== "string" ||
      text.trim().length === 0 ||
      typeof rating !== "number" ||
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400).json({ error: "Invalid review payload" });
    }

    const cafe = await createReview({
      text: text.trim(),
      rating,
      wifiRating,
      hasOutlets,
      noiseLevel,
      cafeId,
    });
    return res.status(201).json(cafe);
  } catch (error: unknown) {
    console.error("Failed to create review:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function modifyReview(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    if (!Number.isInteger(id) || id <= 0 || data === null) {
      return res.status(400).json({ error: "Invalid update payload" });
    }

    const allowedData: {
      text?: string;
      rating?: number;
      wifiRating?: number;
      hasOutlets?: string;
      noiseLevel?: string;
    } = {};

    if ("text" in data) {
      if (typeof data.text !== "string" || data.text.trim().length === 0) {
        return res.status(400).json({ error: "Invalid text" });
      }
      allowedData.text = data.text.trim();
    }

    if ("rating" in data) {
      if (
        typeof data.rating !== "number" ||
        data.rating < 1 ||
        data.rating > 5
      ) {
        return res.status(400).json({ error: "Invalid rating" });
      }
      allowedData.rating = data.rating;
    }

    if ("wifiRating" in data) {
      if (
        typeof data.wifiRating !== "number" ||
        data.wifiRating < 1 ||
        data.wifiRating > 5
      ) {
        return res.status(400).json({ error: "Invalid wifi rating" });
      }
      allowedData.wifiRating = data.wifiRating;
    }

    if ("hasOutlets" in data) {
      if (typeof data.hasOutlets !== "string") {
        return res.status(400).json({ error: "Invalid hasOutlets" });
      }
      allowedData.hasOutlets = data.hasOutlets;
    }

    if ("noiseLevel" in data) {
      if (typeof data.noiseLevel !== "string") {
        return res.status(400).json({ error: "Invalid noise level" });
      }
      allowedData.noiseLevel = data.noiseLevel;
    }

    if (Object.keys(allowedData).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    const review = await updateReview(id, allowedData);
    return res.status(200).json(review);
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2025"
    ) {
      return res.status(404).json({ error: "Review not found" });
    }

    console.error("Failed to update review:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function removeReview(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid review id" });
    }

    const review = await deleteReview(id);
    return res.status(200).json(review);
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2025"
    ) {
      return res.status(404).json({ error: "Review not found" });
    }

    console.error("Failed to delete review:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
