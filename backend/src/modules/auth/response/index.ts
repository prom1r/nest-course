import { IsString } from 'class-validator';

export class AuthUserResponse {
  @IsString()
  firstName: string;

  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsString()
  email: string;

  @IsString()
  token: string;
}
