// src/student/student.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  const mockStudentService = {
    findAll: jest.fn(),
    findByTeacher: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: StudentService,
          useValue: mockStudentService,
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const result = [
        { id: 1, name: 'Student One' },
        { id: 2, name: 'Student Two' },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result as Student[]);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new student', async () => {
      const createStudentDto: CreateStudentDto = {
        name: 'New Student',
        teacherId: 1,
      };
      const result: Student = { id: 1, ...createStudentDto } as any;
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createStudentDto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a student', async () => {
      const updateStudentDto: UpdateStudentDto = {
        name: 'Updated Student',
        teacherId: 2,
      };
      const result: Student = { id: 1, ...updateStudentDto } as any;
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(1, updateStudentDto)).toBe(result);
    });
  });
});
