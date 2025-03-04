import { IsString } from 'class-validator';

export class createUserDto {
  @IsString()
  firstName: string;

  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsString()
  email: string;
}
