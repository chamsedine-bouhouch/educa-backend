import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dtos/create-student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get('teacher/:teacherId')
  findByTeacher(@Param('teacherId') teacherId: number) {
    return this.studentService.findByTeacher(teacherId);
  }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }
}
