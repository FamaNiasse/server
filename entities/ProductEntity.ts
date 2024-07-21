import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Needs } from "./NeedsEntity";
import { Category } from "./CategoryEntity";
import { Pharmacy } from "./PharmacyEntity";

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
    name: "product_needs",
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

  @ManyToMany(() => Pharmacy, pharmacy => pharmacy.products)
  @JoinTable({
    name: "product_pharmacy",
    joinColumn: {
      name: "product_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "pharmacy_id",
      referencedColumnName: "id"
    }
  })
  pharmacies?: Pharmacy[];
}
