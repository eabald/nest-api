import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Address } from './address.entity';
import { Post } from '../posts/post.entity';
import { Expose } from 'class-transformer';
import { PublicFile } from '../files/publicFile.entity';
import { PrivateFile } from '../privateFiles/privateFile.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  @Expose()
  public email: string;

  @Column({ default: false })
  public isEmailConfirmed: boolean;

  @Column()
  @Expose()
  public name: string;

  @Column()
  public password: string;

  @Column()
  public stripeCustomerId: string;

  @Column({ nullable: true })
  public monthlySubscriptionStatus?: string;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public address: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];

  @JoinColumn()
  @OneToOne(() => PublicFile, {
    eager: true,
    nullable: true,
  })
  public avatar?: PublicFile;

  @OneToMany(() => PrivateFile, (file: PrivateFile) => file.owner)
  public files: PrivateFile[];

  @Column({
    nullable: true,
  })
  public currentHashedRefreshToken?: string;

  @OneToMany(() => Comment, (comment: Comment) => comment.post)
  public comments: Comment[];

  @Column({ nullable: true })
  public twoFactorAuthenticationSecret?: string;

  @Column({ default: false })
  public isTwoFactorAuthenticationEnabled: boolean;
}
