import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-user')
  createUsers(@Body() dto: createUserDto) {
    return this.usersService.createUser(dto);
  }
}
