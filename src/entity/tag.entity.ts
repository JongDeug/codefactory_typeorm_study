import { Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity()
export class TagModel {
  // @PrimaryGeneratedColumn()
  // id: number;
  //
  // @Column()
  // name: string;
  // 이렇게 해도 되고

  // 이렇게도 가능 unique
  @PrimaryColumn()
  name: string;

  @ManyToMany(() => PostEntity, (post) => post.tags)
  posts: PostEntity[];
}
