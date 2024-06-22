import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.students)
  teacher: Teacher;
}
