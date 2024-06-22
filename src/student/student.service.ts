import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { CreateStudentDto } from './dtos/create-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentRepository.find({ relations: ['teacher'] });
  }

  async findByTeacher(teacherId: number): Promise<Student[]> {
    return this.studentRepository.find({
      where: { teacher: { id: teacherId } },
      relations: ['teacher'],
    });
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const teacher = await this.teacherRepository.findOne({
      where: { id: createStudentDto.teacherId },
    });
    const student = this.studentRepository.create({
      ...createStudentDto,
      teacher,
    });
    return this.studentRepository.save(student);
  }
}
