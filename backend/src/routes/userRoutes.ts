import { Router } from "express";
import {
  register,
  modifyUser,
  removeUser,
  listUser,
  listUsers,
} from "../controllers/userController";

const userRoutes = Router();
userRoutes.get("/", listUsers);
userRoutes.get("/:id", listUser);
userRoutes.post("/register", register);
userRoutes.patch("/:id", modifyUser);
userRoutes.delete("/:id", removeUser);

export default userRoutes;
