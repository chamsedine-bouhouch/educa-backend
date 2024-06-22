import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { Teacher } from './../teacher/entities/teacher.entity';
import { UpdateStudentDto } from './dtos/update-student.dto';

const studentArray = [
  { id: 1, name: 'Student One', teacher: { id: 1, name: 'Teacher One' } },
  { id: 2, name: 'Student Two', teacher: { id: 1, name: 'Teacher One' } },
];

const oneStudent = {
  id: 1,
  name: 'Student One',
  teacher: { id: 1, name: 'Teacher One' },
};

describe('StudentService', () => {
  let service: StudentService;
  let studentRepository: Repository<Student>;
  let teacherRepository: Repository<Teacher>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Teacher),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    studentRepository = module.get<Repository<Student>>(
      getRepositoryToken(Student),
    );
    teacherRepository = module.get<Repository<Teacher>>(
      getRepositoryToken(Teacher),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      jest
        .spyOn(studentRepository, 'find')
        .mockResolvedValue(studentArray as Student[]);

      const students = await service.findAll();
      expect(students).toEqual(studentArray);
    });
  });

  describe('create', () => {
    it('should successfully create a student', async () => {
      const name = 'Student One';
      const teacherId = 1;
      jest
        .spyOn(teacherRepository, 'findOne')
        .mockResolvedValue({ id: 1, name: 'Teacher One' } as any);
      jest
        .spyOn(studentRepository, 'create')
        .mockReturnValue(oneStudent as Student);
      jest
        .spyOn(studentRepository, 'save')
        .mockResolvedValue(oneStudent as Student);

      const student = await service.create({ name, teacherId });
      expect(student).toEqual(oneStudent);
    });
  });

  describe('update', () => {
    it('should successfully update a student', async () => {
      const updateStudentDto: UpdateStudentDto = {
        name: 'Updated Student',
        teacherId: 2,
      };
      const updatedStudent = {
        id: 1,
        name: 'Updated Student',
        teacher: { id: 2, name: 'Teacher Two' },
      };

      jest
        .spyOn(studentRepository, 'findOne')
        .mockResolvedValue(oneStudent as any);
      jest
        .spyOn(teacherRepository, 'findOne')
        .mockResolvedValue({ id: 2, name: 'Teacher Two' } as any);
      jest
        .spyOn(studentRepository, 'save')
        .mockResolvedValue(updatedStudent as any);

      const student = await service.update(1, updateStudentDto);
      expect(student).toEqual(updatedStudent);
    });

    it('should successfully update a student without changing teacher', async () => {
      const updateStudentDto: UpdateStudentDto = { name: 'Updated Student' };
      const updatedStudent = {
        id: 1,
        name: 'Updated Student',
        teacher: { id: 1, name: 'Teacher One' },
      };

      jest
        .spyOn(studentRepository, 'findOne')
        .mockResolvedValue(oneStudent as any);
      jest
        .spyOn(studentRepository, 'save')
        .mockResolvedValue(updatedStudent as any);

      const student = await service.update(1, updateStudentDto);
      expect(student).toEqual(updatedStudent);
    });
  });
});
