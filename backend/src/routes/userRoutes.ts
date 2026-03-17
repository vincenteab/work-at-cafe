import { Router } from "express";
import {
  addUser,
  modifyUser,
  removeUser,
  listUser,
} from "../controllers/userController";

const userRoutes = Router();
userRoutes.get("/:id", listUser);
userRoutes.post("/", addUser);
userRoutes.patch("/:id", modifyUser);
userRoutes.delete("/:id", removeUser);

export default userRoutes;
