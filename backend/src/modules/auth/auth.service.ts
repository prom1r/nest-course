import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { createUserDto } from '../users/dto';
import { AppErrors } from 'src/common/const/errors';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async reqisterUser(dto: createUserDto): Promise<createUserDto> {
    const existUser = await this.userService.findUserByEmail(dto.email);

    if (existUser) throw new BadRequestException(AppErrors.USER_ALREADY_EXISTS);
    return this.userService.createUser(dto);
  }
}
