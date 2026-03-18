import { Router } from "express";
import {
  removeReview,
  listReviews,
  listReview,
  addReview,
  modifyReview,
} from "../controllers/reviewController";

const reviewRoutes = Router();
reviewRoutes.get("/", listReviews);
reviewRoutes.get("/:id", listReview);
reviewRoutes.post("/", addReview);
reviewRoutes.patch("/:id", modifyReview);
reviewRoutes.delete("/:id", removeReview);

export default reviewRoutes;
