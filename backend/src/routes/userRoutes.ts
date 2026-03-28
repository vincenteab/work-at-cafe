import { Router } from "express";
import {
  register,
  modifyUser,
  removeUser,
  listUser,
  listUsers,
  login,
} from "../controllers/userController";

const userRoutes = Router();
userRoutes.get("/", listUsers);
userRoutes.get("/:id", listUser);
userRoutes.post("/register", register);
userRoutes.patch("/:id", modifyUser);
userRoutes.delete("/:id", removeUser);
userRoutes.post("/login", login);

export default userRoutes;
