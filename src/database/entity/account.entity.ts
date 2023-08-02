import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'accounts' })
@ObjectType()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field()
  provider: string;

  @Column()
  @Field()
  providerAccountId: string;

  @Column({ nullable: true })
  @Field()
  refresh_token: string;

  @Column({ nullable: true })
  @Field()
  access_token: string;

  @Column({ type: 'bigint', nullable: true })
  @Field()
  expires_at: string;

  @Column({ nullable: true })
  @Field()
  token_type: string;

  @Column({ nullable: true })
  @Field()
  scope: string;

  @Column({ nullable: true })
  @Field()
  id_token: string;

  @Column({ nullable: true })
  @Field()
  session_state: string;

  @Column({ nullable: true })
  @Field()
  oauth_token_secret: string;

  @Column({ nullable: true })
  @Field()
  oauth_token: string;

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  @Column()
  @Field(() => ID)
  userId: string;

  @Column({ type: 'bigint', nullable: true })
  @Field()
  refresh_token_expires_in: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}
