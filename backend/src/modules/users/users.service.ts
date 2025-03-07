import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto';

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

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
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

  async getPublicUser(email: string) {
    return this.userRepository.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    });
  }

  async getPublicUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    await this.userRepository.update(dto, { where: { id } });
    return await this.getPublicUserById(id);
  }

  async deleteUser(id: number) {
    await this.userRepository.destroy({ where: { id } });
  }
}
