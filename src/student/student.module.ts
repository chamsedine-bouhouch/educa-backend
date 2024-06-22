import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { TeacherModule } from './../teacher/teacher.module';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Teacher]), TeacherModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
