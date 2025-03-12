import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
  Get,
  Res,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('API')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return this.usersService.getProfile(req);
  }

  @ApiTags('API')
  @ApiResponse({ status: 201, type: UpdateUserDto })
  @Patch('update')
  updateUser(@Body() dto: UpdateUserDto, @Req() request) {
    // return this.usersService.updateUser(request.user.id, dto);
    return;
  }

  @Delete('delete')
  deleteUser(@Req() request) {
    console.log(request.user);
    // return this.usersService.deleteUser(request.user.id);
    return;
  }
}
