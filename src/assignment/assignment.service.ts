import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { Student } from '../student/entities/student.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { CreateAssignmentDto } from './dtos/create-assignment.dto';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    const teacher = await this.teacherRepository.findOne({
      where: { id: createAssignmentDto.teacherId },
    });
    const students = await this.studentRepository.findByIds(
      createAssignmentDto.studentIds,
    );
    const assignment = this.assignmentRepository.create({
      ...createAssignmentDto,
      teacher,
      students,
    });
    return this.assignmentRepository.save(assignment);
  }

  async gradeAssignment(
    assignmentId: number,
    status: string,
  ): Promise<Assignment> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id: assignmentId },
    });
    assignment.status = status;
    return this.assignmentRepository.save(assignment);
  }

  async getReportByTeacher(teacherId: number, date: Date): Promise<any> {
    const assignments = await this.assignmentRepository.find({
      where: { teacher: { id: teacherId }, dueDate: date, status: 'Pass' },
    });
    return {
      teacherId,
      date,
      passedAssignmentsCount: assignments.length,
    };
  }
}
