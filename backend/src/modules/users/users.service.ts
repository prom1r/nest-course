import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { createUserDto } from './dto';
import { AppErrors } from 'src/common/errors';

@Injectable()
export class UsersService {
  // инжектим модель User из библиотеки sequelize что позволит нам использовать методы модели такие как
  // create, findOne, findAll, update, destroy, etc
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(dto: createUserDto): Promise<createUserDto> {
    const existUser = await this.findUserByEmail(dto.email);

    if (existUser) throw new BadRequestException(AppErrors.USER_ALREADY_EXISTS);

    dto.password = await this.hashPassword(dto.password);

    const newUser = {
      firstName: dto.firstName,
      userName: dto.userName,
      password: dto.password,
      email: dto.email,
    };

    await this.userRepository.create(newUser);
    return dto;
  }
}
