import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from "typeorm";
import { Product } from "./ProductEntity";
import { Category } from "./CategoryEntity";


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
