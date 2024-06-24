import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { Student } from './entities/student.entity';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async findAll() {
    try {
      return await this.studentService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch students.');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Student> {
    try {
      const student = await this.studentService.findOne(id);
      if (!student) {
        throw new NotFoundException(`Student with ID ${id} not found.`);
      }
      return student;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to fetch student details.',
      );
    }
  }

  @Get('teacher/:teacherId')
  async findByTeacher(@Param('teacherId') teacherId: number) {
    try {
      return await this.studentService.findByTeacher(teacherId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch students by teacher.',
      );
    }
  }

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    try {
      return await this.studentService.create(createStudentDto);
    } catch (error) {
      throw new BadRequestException('Failed to create student.');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    try {
      const updatedStudent = await this.studentService.update(
        id,
        updateStudentDto,
      );
      if (!updatedStudent) {
        throw new NotFoundException(`Student with ID ${id} not found.`);
      }
      return updatedStudent;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update student.');
    }
  }
}
