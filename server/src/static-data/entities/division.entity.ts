import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Division {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column()
  location: string;
}