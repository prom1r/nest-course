import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { AppErrors } from 'src/common/const/errors';

import { CreateUserDto } from '../users/dto';
import { loginUserDto } from './dto';

import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async reqisterUser(dto: CreateUserDto): Promise<CreateUserDto> {
    const existUser = await this.userService.findUserByEmail(dto.email);

    if (existUser) throw new BadRequestException(AppErrors.USER_ALREADY_EXISTS);
    return this.userService.createUser(dto);
  }

  // async loginUser(dto: loginUserDto): Promise<AuthUserResponse> {
  async loginUser(dto: loginUserDto): Promise<any> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppErrors.USER_NOT_EXISTS);

    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.dataValues.password,
    );
    if (!validatePassword) throw new BadRequestException(AppErrors.WRONG_DATA);

    const user = await this.userService.getPublicUser(dto.email);
    if (!user) throw new BadRequestException(AppErrors.USER_NOT_EXISTS);

    const userData = {
      id: user.dataValues.id,
      name: user.dataValues.firstName,
      email: user.dataValues.email,
    };

    const token = await this.tokenService.generateGwtToken(userData);

    return { user, token };
  }
}
