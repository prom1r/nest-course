import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto';
import { loginUserDto } from './dto';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

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
  // @ApiResponse({ status: 201, type: AuthUserResponse })
  @Post('login')
  login(@Body() dto: loginUserDto, @Res() res: Response): Promise<any> {
    return this.authService.loginUser(dto, res);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('API')
  @Get('logout')
  logout(@Res() res: Response) {
    res.cookie('jwt', '', { maxAge: 0 });
    return res.json({ message: 'Logged out successfully' });
  }
}
