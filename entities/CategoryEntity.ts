import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Product } from './ProductEntity';


@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nom_categorie: string;

  @OneToMany(() => Product, product => product.category)
  products: Product[];
}
