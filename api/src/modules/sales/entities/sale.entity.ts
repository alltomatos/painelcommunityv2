import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  plugin!: string;

  @Column()
  buyer!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value!: number;

  @Column({ default: 'pago' })
  status!: string;

  @Column({ type: 'date' })
  date!: string;

  @Column()
  token!: string;

  @Column()
  product!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 