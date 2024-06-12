import { Router } from "express";
import { UserController } from "../controller/UserController";
import AppDataSource from "../data.source";
import { User } from "../entities/UserEntity";
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
  email: string;
  role: number;
}

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

// Route pour récupérer les informations de l'utilisateur actuel
userRouter.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    console.log('Decoded token:', decodedToken);
    const user = await userRepository.findOne({ where: { id: decodedToken.id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ message: 'Failed to authenticate token', error });
  }
});

// Route pour récupérer tous les utilisateurs (accessible uniquement aux admins)
userRouter.get('/', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (decodedToken.role !== 1) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Route pour mettre à jour un utilisateur
userRouter.put('/:id', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (decodedToken.role !== 1) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { id } = req.params;
    const { pseudo, email, role } = req.body;

    const user = await userRepository.findOne({ where: { id: Number(id) } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.pseudo = pseudo;
    user.email = email;
    user.role = role;

    await userRepository.save(user);
    res.json({ message: 'User updated', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// Route pour supprimer un utilisateur (accessible uniquement aux admins)
userRouter.delete('/:id', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (decodedToken.role !== 1) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { id } = req.params;
    await userRepository.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

export default userRouter;


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