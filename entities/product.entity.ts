import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from './category.entity';
import { Supplier } from './supplier.entity';
import { OrderDetail } from './order-details.entity';
import { IsNotEmpty, Max, Min } from 'class-validator';

@Entity({ name: 'Products' })
export class Product {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  // ----------------------------------------------------------------------------------------------
  // NAME
  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty({ message: '$property is required' })
  @Column({ name: 'Name', length: 100 })
  name: string;

  // ----------------------------------------------------------------------------------------------
  // PRICE
  // ----------------------------------------------------------------------------------------------
  @Min(0, { message: '$property must be greater than $constraint1' })
  @Column({ name: 'Price', type: 'decimal', precision: 18, scale: 2 })
  price: number;

  // ----------------------------------------------------------------------------------------------
  // DISCOUNT
  // ----------------------------------------------------------------------------------------------
  @Min(0, { message: '$property must be greater than $constraint1' })
  @Max(75, { message: '$property must be less than $constraint1' })
  @Column({ name: 'Discount', type: 'decimal', precision: 18, scale: 2, default: 0 })
  discount: number;

  // ----------------------------------------------------------------------------------------------
  // STOCK
  // ----------------------------------------------------------------------------------------------
  @Min(0, { message: '$property must be greater than $constraint1' })
  @Column({ name: 'Stock', type: 'decimal', precision: 18, scale: 2, default: 0 })
  stock: number;

  // ----------------------------------------------------------------------------------------------
  // DESCRIPTION
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'Description', nullable: true })
  description: string;

  // ----------------------------------------------------------------------------------------------
  // CATEGORY ID
  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty({ message: '$property is required' })
  @Column({ name: 'categoryId' })
  categoryId: number;

  // ----------------------------------------------------------------------------------------------
  // SUPPLIER ID
  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty({ message: '$property is required' })
  @Column({ name: 'supplierId' })
  supplierId: number;

  // ----------------------------------------------------------------------------------------------
  // RELATIONS
  // ----------------------------------------------------------------------------------------------
  @ManyToOne(() => Category, (c) => c.products)
  category: Category;

  @ManyToOne(() => Supplier, (s) => s.products)
  supplier: Supplier;

  @OneToMany(() => OrderDetail, (od) => od.product)
  orderDetails: OrderDetail[];
}
