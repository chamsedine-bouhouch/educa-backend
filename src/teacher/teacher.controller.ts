import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { Teacher } from './entities/teacher.entity';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dtos/create-teacher.dto';
import {
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  async findAll(): Promise<Teacher[]> {
    try {
      return await this.teacherService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch teachers.');
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Teacher> {
    try {
      const teacher = await this.teacherService.findOne(id);
      if (!teacher) {
        throw new NotFoundException(`Teacher with ID ${id} not found.`);
      }
      return teacher;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to fetch teacher details.',
      );
    }
  }

  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    try {
      return await this.teacherService.create(createTeacherDto);
    } catch (error) {
      throw new BadRequestException('Failed to create teacher.');
    }
  }
}
