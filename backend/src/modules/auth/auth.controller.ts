import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from '../users/dto';
import { loginUserDto } from './dto';
import { AuthUserResponse } from './response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() dto: createUserDto): Promise<createUserDto> {
    return this.authService.reqisterUser(dto);
  }

  @Post('login')
  login(@Body() dto: loginUserDto): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }
}
