import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  teacherId?: number;
}
