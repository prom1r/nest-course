import { IsString } from 'class-validator';

export class createUserDto {
  @IsString()
  firstName: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  email: string;
}
