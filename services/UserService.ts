import bcrypt from 'bcrypt';
import AppDataSource from '../data.source';
import { User } from '../entities/UserEntity';
import jwt from 'jsonwebtoken';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async signup(pseudo: string, email: string, password: string, role: number) {
    console.log('UserService - signup');

    const existingUser = await this.userRepository.findOneBy({ email });

    if (existingUser) {
      return null;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      pseudo,
      email,
      password: hashedPassword,
      role
    });

    return await this.userRepository.save(newUser);
  }

  async login(email: string, password: string) {
    console.log('UserService - login');

    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === '') {
      throw new Error('JWT_SECRET must have a value');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    return { ...user, token };
  }

  async update(id: number, pseudo: string, email: string, role: number) {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      return null;
    }

    user.pseudo = pseudo;
    user.email = email;
    user.role = role;

    return await this.userRepository.save(user);
  }

  async getAllUsers() {
    return this.userRepository.find();
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}

