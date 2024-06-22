import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dtos/create-assignment.dto';
import { Assignment } from './entities/assignment.entity';

describe('AssignmentController', () => {
  let controller: AssignmentController;
  let service: AssignmentService;

  const mockAssignmentService = {
    create: jest.fn(),
    gradeAssignment: jest.fn(),
    getReportByTeacher: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignmentController],
      providers: [
        {
          provide: AssignmentService,
          useValue: mockAssignmentService,
        },
      ],
    }).compile();

    controller = module.get<AssignmentController>(AssignmentController);
    service = module.get<AssignmentService>(AssignmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new assignment', async () => {
      const createAssignmentDto: CreateAssignmentDto = {
        title: 'Nest ADN Homework',
        dueDate: new Date('2024-06-21'),
        studentIds: [1, 2],
        teacherId: 1,
      };
      const result: Assignment = { id: 1, ...createAssignmentDto } as any;
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createAssignmentDto)).toBe(result);
    });
  });

  describe('gradeAssignment', () => {
    it('should grade an assignment', async () => {
      const assignmentId = 1;
      const gradeDto = { studentId: 1, grade: 'Pass' };
      const result: Assignment = { id: assignmentId, ...gradeDto } as any;
      jest.spyOn(service, 'gradeAssignment').mockResolvedValue(result);

      expect(
        await controller.gradeAssignment(assignmentId, gradeDto.grade),
      ).toBe(result);
    });
  });

  describe('getReportByTeacher', () => {
    it('should get a report for a teacher', async () => {
      const teacherId = 1;
      const date = new Date('2024-06-21');
      const result = {
        teacherId,
        date,
        passedAssignmentsCount: 5, // Assuming a mock result
      };
      jest.spyOn(service, 'getReportByTeacher').mockResolvedValue(result);

      expect(await controller.getReportByTeacher(teacherId, date)).toBe(result);
    });
  });
});
