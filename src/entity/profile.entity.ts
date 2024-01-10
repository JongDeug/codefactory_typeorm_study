import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from './user.entity';

@Entity()
export class ProfileModel {
  @PrimaryGeneratedColumn()
  id: number;

  // 나중에 user 에서 profilemodel을 가져오고 싶으면 user.profile로 가져올 수 있음.
  @OneToOne(() => UserModel, (user) => user.profile)
  // @JoinColumn()
  user: UserModel;

  @Column()
  profileImg: string;
}
