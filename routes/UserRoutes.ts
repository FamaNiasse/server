import { Router } from "express";
import { UserController } from "../controller/UserController";



const userController = new UserController();
const userRouter = Router();

userRouter.post("/signup", (req, res) => {
  console.log("UserRouter - signup");
  userController.signup(req, res);
});


userRouter.post("/login", (req, res) => {
  console.log("UserRouter - login");
  userController.login(req, res);
})

export default userRouter;