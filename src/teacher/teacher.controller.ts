import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Teacher> {
    return this.teacherService.findOne(id);
  }

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return this.teacherService.create(createTeacherDto);
  }
}
