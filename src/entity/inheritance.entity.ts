import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

// Entity 이노테이션 없음.
export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}

@Entity()
export class BookModel extends BaseModel {
  @Column()
  name: string;
}

@Entity()
export class CarModel extends BaseModel {
  @Column()
  brand: string;
}

// Single Base Model(하나의 테이블에 자식 엔티티들의 데이터가 들어감)
// Entity 이노테이션 있음.
@Entity()
@TableInheritance({
  column: {
    name: 'type',
    type: 'varchar',
  },
})
export class SingleBaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}

@ChildEntity()
export class ComputerModel extends SingleBaseModel {
  @Column()
  brand: string;
}

@ChildEntity()
export class AirplaneModel extends SingleBaseModel {
  @Column()
  country: string;
}
