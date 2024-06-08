import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService = new UserService();

  // SIGNUP
  async signup(req: Request, res: Response) {
    console.log("UserController - signup");
    const { pseudo, email, password } = req.body;
    const createUser = await this.userService.signup(pseudo, email, password);

    if (createUser) {
      res.status(201).json({ message: "User created" });
    } else {
      res.status(400).json({ message: "User already exists" });
    }
  }

  // LOGIN
  async login(req: Request, res: Response) {
    console.log("UserController - login");
    const { email, password } = req.body;

    // le service va verifier que email existe et password associé aussi, génère le token et le renvoie
    const user = await this.userService.login(email, password);

    // Vérifie si user est null
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { token } = user;

    // Si on a un token on le renvoie
    if (token) {
      res.status(201).json({ user, message: "Connexion success" });
    } else {
      res.status(500).json({ message: "You failed to connect!" });
    }
  }
}
