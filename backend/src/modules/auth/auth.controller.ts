import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto';
import { loginUserDto } from './dto';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: CreateUserDto })
  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.reqisterUser(dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 201, type: AuthUserResponse })
  @Post('login')
  login(@Body() dto: loginUserDto): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }
}
