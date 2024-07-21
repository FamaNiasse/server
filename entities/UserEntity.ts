import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable : false})
  pseudo: string;

  @Column({nullable : false})
  email: string;

  @Column({nullable : false})
  password: string;
  
  @Column({nullable: false, default: 2})
  role: number;

  @Column({nullable: true})
  token: string;

}