import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
  email: string;
  role: number;
}

export class UserController {
  private userService = new UserService();

  async signup(req: Request, res: Response) {
    
    const { pseudo, email, password, role } = req.body;

    if (role === 1) {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const token = authHeader.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      if (decodedToken.role !== 1) {
        return res.status(403).json({ message: 'Forbidden' });
      }
    }

    const createUser = await this.userService.signup(pseudo, email, password, role);

    if (createUser) {
      res.status(201).json({ message: 'User created' });
      console.log("UserController - signup");
    } else {
      res.status(400).json({ message: 'User already exists' });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await this.userService.login(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { token, role } = user;
  

    if (token) {
      res.status(200).json({ token, role , message: 'Connexion success' });
    } else {
      res.status(500).json({ message: 'Failed to connect' });
    }
  } 

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { pseudo, email, role } = req.body;
    const updatedUser = await this.userService.update(Number(id), pseudo, email, role);

    if (updatedUser) {
      res.status(200).json({ message: 'User updated', data: updatedUser });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this.userService.deleteUser(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  }
}
