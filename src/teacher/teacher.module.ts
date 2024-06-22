import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { Teacher } from './entities/teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from '../assignment/entities/assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Assignment])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
