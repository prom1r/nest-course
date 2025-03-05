import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { AppErrors } from 'src/common/const/errors';

import { createUserDto } from '../users/dto';
import { loginUserDto } from './dto';

import { AuthUserResponse } from './response';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async reqisterUser(dto: createUserDto): Promise<createUserDto> {
    const existUser = await this.userService.findUserByEmail(dto.email);

    if (existUser) throw new BadRequestException(AppErrors.USER_ALREADY_EXISTS);
    return this.userService.createUser(dto);
  }

  async loginUser(dto: loginUserDto): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppErrors.USER_NOT_EXISTS);

    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.dataValues.password,
    );
    if (!validatePassword) throw new BadRequestException(AppErrors.WRONG_DATA);

    return existUser;
  }
}
