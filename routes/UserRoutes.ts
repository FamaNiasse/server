import { Router } from "express";
import { UserController } from "../controller/UserController";


const userController = new UserController();
const userRouter = Router();

// Route pour l'inscription
userRouter.post("/signup", (req, res) => {
  console.log("UserRouter - signup");
  userController.signup(req, res);
});

// Route pour la connexion
userRouter.post("/login", (req, res) => {
  console.log("UserRouter - login");
  userController.login(req, res);
});

export default userRouter;
