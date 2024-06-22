// src/teacher/teacher.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dtos/create-teacher.dto';
import { Teacher } from './entities/teacher.entity';

describe('TeacherController', () => {
  let controller: TeacherController;
  let service: TeacherService;

  const mockTeacherService = {
    findAll: jest.fn(() =>
      Promise.resolve([
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
      ]),
    ),
    create: jest.fn((dto: CreateTeacherDto) =>
      Promise.resolve({
        id: Date.now(),
        ...dto,
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [
        {
          provide: TeacherService,
          useValue: mockTeacherService,
        },
      ],
    }).compile();

    controller = module.get<TeacherController>(TeacherController);
    service = module.get<TeacherService>(TeacherService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of teachers', async () => {
      const result: Teacher[] = await controller.findAll();
      expect(result).toEqual([
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a teacher', async () => {
      const createTeacherDto: CreateTeacherDto = {
        name: 'John Smith',
        email: 'john.smith@example.com',
      };

      const result: Teacher = await controller.create(createTeacherDto);
      expect(result).toEqual({
        id: expect.any(Number),
        ...createTeacherDto,
      });
      expect(service.create).toHaveBeenCalledWith(createTeacherDto);
    });
  });
});
