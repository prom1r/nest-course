import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { createUserDto } from './dto';

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

  async createUser(dto): Promise<createUserDto> {
    dto.password = await this.hashPassword(dto.password);

    await this.userRepository.create(dto);
    return dto;
  }
}
