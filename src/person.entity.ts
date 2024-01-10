import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class Name {
  @Column()
  first: string;

  @Column()
  last: string;
}

@Entity()
export class StudentModel {
  @PrimaryGeneratedColumn()
  id: number;

  // Entity Embedding
  @Column(() => Name)
  name: Name;

  @Column()
  class: string;
}

@Entity()
export class TeacherModel {
  @PrimaryGeneratedColumn()
  id: number;

  // Entity Embedding
  @Column(() => Name)
  name: Name;

  @Column()
  salary: number;
}
