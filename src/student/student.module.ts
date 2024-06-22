import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Assignment } from '../assignment/entities/assignment.entity';
import { Teacher } from '../teacher/entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Student, Assignment])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
