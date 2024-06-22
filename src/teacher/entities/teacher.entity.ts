import { Assignment } from '../../assignment/entities/assignment.entity';
import { Student } from '../../student/entities/student.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Student, (student) => student.teacher)
  students: Student[];

  @OneToMany(() => Assignment, (assignment) => assignment.teacher)
  assignments: Assignment[];
}
