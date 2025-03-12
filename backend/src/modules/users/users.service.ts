import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Post } from '../posts/models/post.model';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  // инжектим модель User из библиотеки sequelize что позволит нам использовать методы модели такие как
  // create, findOne, findAll, update, destroy, etc
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly configService: ConfigService,
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

  async getPublicUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
      include: {
        model: Post,
        required: false,
        attributes: ['id', 'discription'],
      },
    });
  }

  async getProfile(@Req() req: Request) {
    const token = req.cookies['jwt'];

    if (!token) {
      throw new UnauthorizedException('Not authenticated');
    }

    try {
      const payload = new JwtService().verify(token, {
        secret: this.configService.get('secret'),
      });

      return {
        user: { id: payload.userId, email: payload.email, name: payload.name },
      };
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  // async getPublicUserById(id: number) {
  //   return this.userRepository.findOne({
  //     where: { id },
  //     attributes: { exclude: ['password'] },
  //     include: {
  //       model: Post,
  //       required: false,
  //     },
  //   });
  // }

  // async updateUser(id: number, dto: UpdateUserDto) {
  //   await this.userRepository.update(dto, { where: { id } });
  //   return await this.getPublicUserById(id);
  // }

  // async deleteUser(id: number) {
  //   await this.userRepository.destroy({ where: { id } });
  // }
}
