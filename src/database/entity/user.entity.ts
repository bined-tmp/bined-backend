import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Session } from './session.entity';
import { Account } from './account.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ nullable: true, unique: true })
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field(() => Date)
  emailVerified: Date;

  @Column({ nullable: true })
  @Field()
  image: string;

  @Column({ nullable: true })
  @Field()
  name: string;

  @Column({ nullable: true, unique: true })
  @Field()
  username: string;

  @Column({ nullable: true })
  @Field()
  description: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];
}
