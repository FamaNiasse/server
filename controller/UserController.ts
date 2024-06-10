import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService = new UserService();

  // SIGNUP
  async signup(req: Request, res: Response) {
    console.log("UserController - signup");
    const { pseudo, email, password } = req.body;

    try {
      const createUser = await this.userService.signup(pseudo, email, password);

      if (createUser) {
        return res.status(201).json({ message: "User created" });
      } else {
        return res.status(400).json({ message: "User already exists" });
      }
    } catch (error) {
      console.error("Signup error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // LOGIN
  async login(req: Request, res: Response) {
    console.log("UserController - login");
    const { email, password } = req.body;

    try {
      const user = await this.userService.login(email, password);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const { token } = user;

      if (token) {
        return res.status(200).json({ user, message: "Connexion success" });
      } else {
        return res.status(500).json({ message: "Failed to connect" });
      }
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
