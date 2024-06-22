import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentService } from './assignment.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Student } from '../student/entities/student.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { CreateAssignmentDto } from './dtos/create-assignment.dto';

describe('AssignmentService', () => {
  let service: AssignmentService;
  let assignmentRepository: Repository<Assignment>;
  let studentRepository: Repository<Student>;
  let teacherRepository: Repository<Teacher>;

  const mockAssignmentRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockStudentRepository = {
    findByIds: jest.fn(),
  };

  const mockTeacherRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignmentService,
        {
          provide: getRepositoryToken(Assignment),
          useValue: mockAssignmentRepository,
        },
        {
          provide: getRepositoryToken(Student),
          useValue: mockStudentRepository,
        },
        {
          provide: getRepositoryToken(Teacher),
          useValue: mockTeacherRepository,
        },
      ],
    }).compile();

    service = module.get<AssignmentService>(AssignmentService);
    assignmentRepository = module.get<Repository<Assignment>>(
      getRepositoryToken(Assignment),
    );
    studentRepository = module.get<Repository<Student>>(
      getRepositoryToken(Student),
    );
    teacherRepository = module.get<Repository<Teacher>>(
      getRepositoryToken(Teacher),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an assignment', async () => {
      const createAssignmentDto: CreateAssignmentDto = {
        title: 'Math Homework',
        dueDate: new Date('2024-06-30'),
        teacherId: 1,
        studentIds: [1, 2],
      };

      const mockTeacher = { id: 1, name: 'Test Teacher' };
      const mockStudents = [
        { id: 1, name: 'Student One' },
        { id: 2, name: 'Student Two' },
      ];

      jest
        .spyOn(teacherRepository, 'findOne')
        .mockResolvedValue(mockTeacher as any);
      jest
        .spyOn(studentRepository, 'findByIds')
        .mockResolvedValue(mockStudents as any);

      const mockAssignment = { id: 1, ...createAssignmentDto };
      jest
        .spyOn(assignmentRepository, 'create')
        .mockReturnValue(mockAssignment as any);
      jest
        .spyOn(assignmentRepository, 'save')
        .mockResolvedValue(mockAssignment as any);

      const result = await service.create(createAssignmentDto);

      expect(result).toEqual(mockAssignment);
      expect(teacherRepository.findOne).toHaveBeenCalledWith({
        where: { id: createAssignmentDto.teacherId },
      });
      expect(studentRepository.findByIds).toHaveBeenCalledWith(
        createAssignmentDto.studentIds,
      );
      expect(assignmentRepository.create).toHaveBeenCalledWith({
        ...createAssignmentDto,
        teacher: mockTeacher,
        students: mockStudents,
      });
      expect(assignmentRepository.save).toHaveBeenCalledWith(mockAssignment);
    });
  });

  describe('gradeAssignment', () => {
    it('should update the status of an assignment', async () => {
      const assignmentId = 1;
      const status = 'Pass';
      const mockAssignment = { id: assignmentId, status };

      jest
        .spyOn(assignmentRepository, 'findOne')
        .mockResolvedValue(mockAssignment as Assignment);
      jest
        .spyOn(assignmentRepository, 'save')
        .mockResolvedValue(mockAssignment as Assignment);

      const result = await service.gradeAssignment(assignmentId, status);

      expect(result).toEqual(mockAssignment);
      expect(assignmentRepository.findOne).toHaveBeenCalledWith({
        where: { id: assignmentId },
      });
      expect(mockAssignment.status).toEqual(status);
      expect(assignmentRepository.save).toHaveBeenCalledWith(mockAssignment);
    });
  });

  describe('getReportByTeacher', () => {
    it('should return a report for a teacher', async () => {
      const teacherId = 1;
      const date = new Date('2024-06-21');
      const mockAssignments = [
        { id: 1, teacher: { id: teacherId }, dueDate: date, status: 'Pass' },
        { id: 2, teacher: { id: teacherId }, dueDate: date, status: 'Fail' },
      ];

      jest
        .spyOn(assignmentRepository, 'find')
        .mockResolvedValue(mockAssignments as any);

      const result = await service.getReportByTeacher(teacherId, date);

      expect(result).toEqual({
        teacherId,
        date,
        passedAssignmentsCount: 2, // Only count 'Pass' assignments
      });
      expect(assignmentRepository.find).toHaveBeenCalledWith({
        where: { teacher: { id: teacherId }, dueDate: date, status: 'Pass' },
      });
    });
  });
});
