import { IsString, IsDateString, IsNumber, IsArray } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  title: string;

  @IsDateString()
  dueDate: string;

  @IsNumber()
  teacherId: number;

  @IsArray()
  studentIds: number[];
}
