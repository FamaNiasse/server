import bcrypt from "bcrypt";
import AppDataSource from "../data.source";
import { User } from "../entities/UserEntity";
import jwt from "jsonwebtoken";


export class UserService {

//repository : permet d'aller taper dans la table user de notre BDD
// private : utilisable uniquement dans cette classe
private userRepository = AppDataSource.getRepository(User);


  async signup(pseudo: string, email: string, password: string) {
    console.log("UserService");

    // 10 correspond au nombre de round pour le hashage
    const hashedPassword = await bcrypt.hash(password, 10);

    // grace au repository on a acces à la methode create qui est notre requete SQL avec orm
    const newUser = this.userRepository.create({
        pseudo: pseudo,
        email: email, 
        password: hashedPassword,
        role: 2
    });

    // on save car la methode create ne save pas, elle create juste
 return await this.userRepository.save(newUser);
  }

// 4 - Methode de login
  async login(email: string, password: string) {
    // on recupere le user
  const user = await this.userRepository.findOneBy({email: email});

  // je verifie si user existe
  if(!user) {
    return null
  }

  // fonction compare va crypter le passxord recu et le comparer avec celui en base
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid) {
    return null
  }

  // Générerer un token, on envoie un payload avec id et email, on envoit notre clé et il expire dans 1h
  //verify signature c'est le password
  // methode sign pour créer un token avec la technologie JWT
  const token = jwt.sign({
  id: user.id, email: user.email},
  process.env.JWT_SECRET!, 
  {expiresIn: "1h"});

  user.token = token;
  this.userRepository.save(user);
  // on renvoit le token si email et password ok
  // ce token contient des infos sur notre user
  return user;


  }
}