import { Body, Controller, Get, Post } from '@nestjs/common';
import { Teacher } from './entities/teacher.entity';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dtos/create-teacher.dto';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  findAll(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return this.teacherService.create(createTeacherDto);
  }
}
