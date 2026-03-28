import { Router } from "express";
import {
  listCafes,
  addCafes,
  modifyCafe,
  removeCafe,
  listCafe,
} from "../controllers/cafeController";
import { requireAuth } from "../middleware/authMiddleware";

const cafeRoutes = Router();
cafeRoutes.get("/", listCafes);
cafeRoutes.get("/:id", listCafe);
cafeRoutes.post("/", requireAuth, addCafes);
cafeRoutes.patch("/:id", requireAuth, modifyCafe);
cafeRoutes.delete("/:id", requireAuth, removeCafe);

export default cafeRoutes;
