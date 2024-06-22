import { IsString, IsNumber } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsNumber()
  teacherId: number;
}
