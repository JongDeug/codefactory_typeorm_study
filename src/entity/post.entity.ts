import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from './user.entity';
import { TagModel } from './tag.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // post 입장에서 봤을 때 post가 many임, + (user) => user.posts 에서 user는 아무거나 써도되는듯;
  @ManyToOne(() => UserModel, (user) => user.posts)
  // @JoinColumn() 생략가능, ManyToOne이 아이디를 들고 있게됨.
  author: UserModel;

  @ManyToMany(() => TagModel, (tag) => tag.posts)
  @JoinTable()
  tags: TagModel[];

  @Column()
  title: string;
}
