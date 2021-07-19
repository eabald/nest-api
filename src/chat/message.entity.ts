import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public content: string;

  @ManyToOne(() => User)
  public author: User;
}
