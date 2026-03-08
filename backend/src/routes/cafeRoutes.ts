import { Router } from "express";
import { listCafes, addCafes } from "../controllers/cafeController";

const router = Router();
router.get("/", listCafes);
router.post("/", addCafes);

export default router;
