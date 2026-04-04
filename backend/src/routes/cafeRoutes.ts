import { Router } from "express";
import {
  listCafes,
  addCafes,
  modifyCafe,
  removeCafe,
  listCafe,
} from "../controllers/cafeController";

const cafeRoutes = Router();
cafeRoutes.get("/", listCafes);
cafeRoutes.get("/:id", listCafe);
cafeRoutes.post("/", addCafes);
cafeRoutes.patch("/:id", modifyCafe);
cafeRoutes.delete("/:id", removeCafe);

export default cafeRoutes;
