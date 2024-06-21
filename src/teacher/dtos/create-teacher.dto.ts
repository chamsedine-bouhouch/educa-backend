import { IsEmail, IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
