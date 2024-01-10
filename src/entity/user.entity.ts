import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostEntity } from './post.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  // @PrimaryColumn : 모든 테이블에서 기본적으로 존재해야한다. 테이블 안에서 각각의 Row를 구분할 수 있는 칼럼이다.
  // @PrimaryGeneratedColumn() : 자동으로 ID를 생성한다. 순서대로 위로 올라간다.
  // @PrimaryGeneratedColumn('uuid') : 수학적 알고리즘으로 절대로 겹치지 않은 id가 생성됨.

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // @Column({
  //   // 데이터베이스에서 인지하는 칼럼 타입
  //   // 자동으로 유추됨.
  //   type: 'varchar',
  //   // 데이터베이스 칼럼 이름
  //   // 프로퍼티 이름으로 자동 유추됨.
  //   name: 'title',
  //   // 값의 길이
  //   // 입력할 수 있는 글자의 길이가 300
  //   length: 300,
  //   // null이 가능한지
  //   nullable: true,
  //   // true면 처음 저장할 때만 값 지정 가능
  //   // 이후에는 값 변경 불가능
  //   update: true,
  //   // find()를 실행할 때 기본으로 값을 불러올지
  //   // 기본값이 true
  //   select: false,
  //   // 아무것도 입력하지 않았을 때 기본으로 입력되는 값
  //   default: 'default value',
  //   // 칼럼중에서 유일무이한 값이 돼야하는지
  //   // email 같은거에 사용됨.
  //   unique: false,
  // })
  // title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // 데이터가 생성되는 날짜와 시간이 자동으로 찍힌다.
  @CreateDateColumn()
  createAt: Date;

  // 데이터가 업데이트되는 날짜와 시간이 자동으로 찍힌다.
  @UpdateDateColumn()
  updateAt: Date;

  // 데이터가 업데이트 될 때마다 1씩 올라간다.
  // 처음 생성되면 값은 1이다.
  // save() 함수가 몇번 불렸는지 기억한다.
  @VersionColumn()
  version: number;

  // primary key는 아닌데 데이터가 생성될 때마다 자동으로 올라감.
  // @Generated 는 @Column 이랑 같이 써야함.
  // 속성 : 'increment', 'uuid'
  @Column()
  @Generated('uuid')
  additionalId: number;

  // ** One to One **
  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    // **이 옵션들은 onetomany, manytoone 어디든 넣을 수 있음.

    // find() 실행할 때마다 항상 같이 가져올 relation(기본값 false), controller에서 relation 없어도됨.
    eager: false,
    // 저장할 때 relation을 한번에 같이 저장할 수 있게 제공해줌. false면 그게 안됨.
    cascade: true,
    // default: true, 이거 false해도 에러가 안나는데 ,, **나중에 물어보자**
    nullable: true,
    // ~했을 때 , 관계가 삭제됐을 때(user가 삭제됐을 때)
    // no action -> 아무것도 안함
    // cascade -> 참조하는 row도 같이 삭제
    // set null -> 참조하는 row에서 참조 id를 null로 변경
    // set default -> 기본 세팅으로 설정(테이블의 기본세팅)
    // restrict -> 참조하고 있는 row가 있는 경우 참조당하는 row 삭제 불가
    // ** 이것도 작동이 안되는데 **
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  profile: ProfileModel;

  // ** One to Many **
  @OneToMany(() => PostEntity, (posts) => posts.author)
  posts: PostEntity[];

  @Column({
    default: 0,
  })
  count: number;
}
