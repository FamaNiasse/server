import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Needs } from "./NeedsEntity";

@Entity()
export class Product {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  nom_produit: string;

  @Column({nullable: false})
  image: string;

  @Column({nullable: false})
  description: string;

  @ManyToMany(() => Needs, needs => needs.products)
  @JoinTable({
    name: "product_needs", // nom de la table de liaison
    joinColumn: {
      name: "product_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "need_id",
      referencedColumnName: "id"
    }
  })
  needs?: Needs[];
}
