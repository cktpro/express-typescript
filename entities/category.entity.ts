import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany, BeforeUpdate, BeforeInsert } from 'typeorm';
import { Product } from './product.entity';
import { IsNotEmpty, Length,validate } from 'class-validator';
import e from 'cors';

@Entity({ name: 'Categories' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  // ----------------------------------------------------------------------------------------------
  // NAME
  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty({ message: '$property is required' })
  @Length(3, 100, { message: '$value must be between $constraint1 and $constraint2 characters' })
  @Column({ name: 'Name', unique: true, length: 100 })
  name: string;

  // ----------------------------------------------------------------------------------------------
  // DESCRIPTION
  // ----------------------------------------------------------------------------------------------
  @Length(0, 500, { message: '$value must be between $constraint1 and $constraint2 characters' })
  @Column({ name: 'Description', length: 500, nullable: true })
  description: string;

  // ----------------------------------------------------------------------------------------------
  // RELATIONS
  // ----------------------------------------------------------------------------------------------
  @OneToMany(() => Product, (p) => p.category)
  products: Product[];



  //HOOKS
  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw errors[0].constraints;
    }
  }
}
