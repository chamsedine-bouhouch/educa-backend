import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Teacher } from '../../teacher/entities/teacher.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.students)
  teacher: Teacher;
}
