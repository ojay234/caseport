import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, Repository, ManyToOne, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Division } from 'src/static-data/entities/division.entity';

export enum UserRole {
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
  USER = 'lawyer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column({ unique: true })
  userId: string;

  @Column({ unique: true }) 
  email: string;

  @Column()
  password: string;

  @Column({ default: 'lawyer' }) 
  role: string;

  @Column()
  fullName?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true, type: 'text' })
  profileImage?: string; 

  @Column({ nullable: true, type: 'text' })
  digitalSignature?: string; 

  @Column({ default: false })
  isVerified: boolean;

  @ManyToOne(() => Division, { nullable: true }) 
  @JoinColumn({ name: 'divisionId' }) 
  division?: Division;

  @BeforeInsert()
  async beforeInsertActions() {
  
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    
    
    
  }




  
}