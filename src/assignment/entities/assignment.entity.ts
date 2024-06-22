import { Student } from '../../student/entities/student.entity';
import { Teacher } from '../../teacher/entities/teacher.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  dueDate: Date;

  @Column({ default: 'Pending' })
  status: string; // Pass or Fail

  @ManyToOne(() => Teacher, (teacher) => teacher.assignments)
  teacher: Teacher;

  @ManyToMany(() => Student, (student) => student.assignments)
  students: Student[];
}
