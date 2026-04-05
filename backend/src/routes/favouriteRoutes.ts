import { Router } from "express";
import {
  listFavourites,
  addFavourite,
  removeFavourite,
} from "../controllers/favouriteController";
import { requireAuth } from "../middleware/authMiddleware";

const favouriteRoutes = Router();
favouriteRoutes.use(requireAuth);
favouriteRoutes.get("/", listFavourites);
favouriteRoutes.post("/", addFavourite);
favouriteRoutes.delete("/:id", removeFavourite);

export default favouriteRoutes;
