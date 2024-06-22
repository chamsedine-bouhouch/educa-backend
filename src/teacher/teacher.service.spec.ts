import { Test, TestingModule } from '@nestjs/testing';
import { TeacherService } from './teacher.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dtos/create-teacher.dto';

describe('TeacherService', () => {
  let service: TeacherService;
  let repository: Repository<Teacher>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherService,
        {
          provide: getRepositoryToken(Teacher),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TeacherService>(TeacherService);
    repository = module.get<Repository<Teacher>>(getRepositoryToken(Teacher));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const teacherArray = [
      { id: 1, name: 'Teacher One', email: 'one@gmail.com' },
      { id: 2, name: 'Teacher Two', email: 'two@gmail.com' },
    ];
    it('should return an array of teachers', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(teacherArray as Teacher[]);

      const teachers = await service.findAll();
      expect(teachers).toEqual(teacherArray);
    });
  });

  describe('create', () => {
    const oneTeacher = {
      id: 1,
      name: 'Teacher One',
      email: 'one@gmail.com',
      students: [],
    };

    it('should successfully create a teacher', async () => {
      const createTeacherDto: CreateTeacherDto = {
        name: 'Teacher One',
        email: 'one@gmail.com',
      };
      jest.spyOn(repository, 'create').mockReturnValue(oneTeacher as Teacher);
      jest.spyOn(repository, 'save').mockResolvedValue(oneTeacher as Teacher);

      const teacher = await service.create(createTeacherDto);
      expect(teacher).toEqual(oneTeacher);
    });
  });
});
