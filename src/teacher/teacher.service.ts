import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dtos/create-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find();
  }
  async findOne(id: number): Promise<Teacher> {
    return this.teacherRepository.findOne({
      where: { id },
      relations: ['students'],
    });
  }

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const newTeacher = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(newTeacher);
  }
}
