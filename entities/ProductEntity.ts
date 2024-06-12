import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Needs } from "./NeedsEntity";
import { Category } from "./CategoryEntity";

@Entity()
export class Product {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nom_produit: string;

  @Column({ nullable: false })
  image: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'decimal', nullable: false })
  prix: number;

  @Column({ type: 'boolean', default: false })
  promo: boolean;

  
  @ManyToOne(() => Category, category => category.products)
  category: Category;

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

