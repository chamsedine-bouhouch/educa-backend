import { IsString, IsDateString, IsNumber, IsArray } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  title: string;

  @IsDateString()
  dueDate: Date;

  @IsNumber()
  teacherId: number;

  @IsArray()
  studentIds: number[];
}
