import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('API')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, type: UpdateUserDto })
  @Patch('update')
  updateUser(@Body() dto: UpdateUserDto, @Req() request) {
    return this.usersService.updateUser(request.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteUser(@Req() request) {
    console.log(request.user);
    return this.usersService.deleteUser(request.user.id);
  }
}
