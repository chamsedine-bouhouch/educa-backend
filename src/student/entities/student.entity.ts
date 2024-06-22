import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teacher } from '../../teacher/entities/teacher.entity';
import { Assignment } from '../../assignment/entities/assignment.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.students)
  teacher: Teacher;

  @ManyToMany(() => Assignment, (assignment) => assignment.students)
  @JoinTable()
  assignments: Assignment[];
}
