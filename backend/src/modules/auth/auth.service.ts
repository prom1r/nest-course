import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { AppErrors } from 'src/common/const/errors';

import { CreateUserDto } from '../users/dto';
import { loginUserDto } from './dto';

import { JwtService } from '@nestjs/jwt';

import { Response } from 'express';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async reqisterUser(dto: CreateUserDto): Promise<CreateUserDto> {
    const existUser = await this.userService.findUserByEmail(dto.email);

    if (existUser) throw new BadRequestException(AppErrors.USER_ALREADY_EXISTS);
    return this.userService.createUser(dto);
  }

  async loginUser(dto: loginUserDto, res: Response): Promise<any> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppErrors.USER_NOT_EXISTS);

    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.dataValues.password,
    );
    if (!validatePassword) throw new BadRequestException(AppErrors.WRONG_DATA);

    const user = await this.userService.findUserByEmail(dto.email);

    if (!user) throw new BadRequestException(AppErrors.USER_NOT_EXISTS);

    const payload = {
      userId: user.dataValues.id,
      email: user.dataValues.email,
      name: user.dataValues.firstName,
    };
    const token = this.jwtService.sign(payload);

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
    });

    return res.json({ message: 'Logged in successfully' });
  }
}
