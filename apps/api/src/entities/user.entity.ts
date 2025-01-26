import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '../interfaces';
import { Roles } from '../enums/role.enum';

@Entity({ name: 'users' })
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ default: Roles.user })
  role!: string;
}
