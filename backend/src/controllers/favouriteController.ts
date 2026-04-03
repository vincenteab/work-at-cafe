import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import {
  getFavourites,
  createFavourite,
  deleteFavourite,
} from "../services/favouriteService";

export async function listFavourites(req: AuthRequest, res: Response) {
  try {
    const userId = req.user!.userId;

    const favorites = await getFavourites(userId);

    const favoritedCafes = favorites.map((f: { cafe: any }) => f.cafe);
    res.status(200).json(favoritedCafes);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function addFavourite(req: AuthRequest, res: Response) {
  try {
    const userId = req.user!.userId;
    const { cafeId } = req.body;

    if (!cafeId) {
      return res.status(400).json({ error: "cafeId is required" });
    }

    const newFavorite = await createFavourite({ userId, cafeId });

    res.status(201).json(newFavorite);
  } catch (error: any) {
    // Prisma throws code P2002 if duplicate
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "Cafe is already in your favorites" });
    }
    console.error("Error adding favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function removeFavourite(req: AuthRequest, res: Response) {
  try {
    const userId = req.user!.userId;
    const cafeId = parseInt(req.body);

    const deletedFavourite = await deleteFavourite({ userId, cafeId });

    res.status(200).json({ deletedFavourite });
  } catch (error: any) {
    // Prisma throws P2025 if it tries delete non-existent record
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Favorite not found" });
    }
    console.error("Error removing favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
