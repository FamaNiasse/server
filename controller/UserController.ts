import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import jwt from "jsonwebtoken";
import { JwtPayload } from 'jsonwebtoken';

export class UserController {
  private userService = new UserService();

  async signup(req: Request, res: Response) {
    console.log('UserController - signup');
    const { pseudo, email, password, role } = req.body;

    // Vérification de l'authentification
    if (role === 1) { // Si le rôle est admin
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const token = authHeader.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      
      if (decodedToken.role !== 1) { // Si l'utilisateur authentifié n'est pas admin
        return res.status(403).json({ message: 'Forbidden' });
      }
    }

    const createUser = await this.userService.signup(pseudo, email, password);

    if (createUser) {
      res.status(201).json({ message: 'User created' });
    } else {
      res.status(400).json({ message: 'User already exists' });
    }
  }

  async login(req: Request, res: Response) {
    console.log('UserController - login');
    const { email, password } = req.body;

    const user = await this.userService.login(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { token } = user;

    if (token) {
      res.status(200).json({ user, message: 'Connexion success' });
    } else {
      res.status(500).json({ message: 'Failed to connect' });
    }
  }
}
