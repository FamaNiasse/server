import { Router } from "express";
import { UserController } from "../controller/UserController";
import AppDataSource from "../data.source";
import { User } from "../entities/UserEntity";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

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

// Route temporaire pour créer un admin
// userRouter.post('/create-admin', async (req, res) => {
//   const { pseudo, email, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const adminUser = userRepository.create({
//       pseudo,
//       email,
//       password: hashedPassword,
//       role: 1 // rôle admin
//     });

//     const createdUser = await userRepository.save(adminUser);
//     res.status(201).json(createdUser);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating admin user', error });
//   }
// });



export default userRouter;
