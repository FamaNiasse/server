import bcrypt from "bcrypt";
import AppDataSource from "../data.source";
import { User } from "../entities/UserEntity";
import jwt from "jsonwebtoken";


export class UserService {
  //repository : permet d'aller taper dans la table user de notre BDD
  // private : utilisable uniquement dans cette classe
  private userRepository = AppDataSource.getRepository(User);

  async signup(pseudo: string, email: string, password: string) {
    console.log("UserService - signup");

    // Vérifier si un utilisateur avec le même email existe déjà
    const existingUser = await this.userRepository.findOneBy({ email: email });

    if (existingUser) {
      // Si un utilisateur existe déjà, retourner null ou lancer une erreur
      return null;
    }

    // 10 correspond au nombre de rounds pour le hashage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer le nouvel utilisateur
    const newUser = this.userRepository.create({
      pseudo: pseudo,
      email: email,
      password: hashedPassword,
      role: 2
    });

    // Enregistrer le nouvel utilisateur
    return await this.userRepository.save(newUser);
  }

  // Méthode de login
  async login(email: string, password: string) {
    console.log("UserService - login");
    // Récupérer l'utilisateur
    const user = await this.userRepository.findOneBy({ email: email });

    // Vérifier si l'utilisateur existe
    if (!user) {
      return null;
    }

    // Comparer le mot de passe reçu avec celui en base
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === "") {
      throw new Error('JWT_SECRET must have a value');
    }

    // Générer un token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!, // Assure-toi que cette ligne utilise la clé secrète définie
      { expiresIn: "1h" }
    );

    user.token = token;
    await this.userRepository.save(user);

    // Retourner l'utilisateur avec le token
    return user;
  }
}