import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Product } from "./ProductEntity";

@Entity()
export class Pharmacy {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nom_pharmacie?: string;

  @Column({ nullable: true })
  numero_voie?: number;

  @Column({ nullable: true })
  type_de_voie?: string;

  @Column({ nullable: true })
  voie?: string;

  @Column({ nullable: false })
  departement?: number;

  @Column({ nullable: false })
  ville?: string;

  @Column({ nullable: false })
  cp?: number;

  @Column({ nullable: false })
  commune?: string;

  @Column({ nullable: true })
  telephone?: number;

  @ManyToMany(() => Product, product => product.pharmacies)
  products?: Product[];
}
