import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Product } from "./ProductEntity";


@Entity()
export class Needs {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({nullable: false})
  nom_besoin?: string;

  @Column({nullable: false})
  pictogramme?: string;

  @ManyToMany(() => Product, product => product.needs)
  products?: Product[];
}
