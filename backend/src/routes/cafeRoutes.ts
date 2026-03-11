import { Router } from "express";
import {
  listCafes,
  addCafes,
  modifyCafe,
  removeCafe,
  listCafe,
} from "../controllers/cafeController";

const router = Router();
router.get("/", listCafes);
router.get("/:id", listCafe);
router.post("/", addCafes);
router.patch("/:id", modifyCafe);
router.delete("/:id", removeCafe);

export default router;
