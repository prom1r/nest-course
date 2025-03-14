import { Injectable } from '@nestjs/common';
import { Post } from './models/post.model';
import { InjectModel } from '@nestjs/sequelize';
import { PostDto } from './dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postRepository: typeof Post,
    private readonly configService: ConfigService,
  ) {}

  async createPost(postDto: PostDto, req: Request, res: Response) {
    const token = req.cookies['jwt'];

    if (!token) {
      throw new Error('Not authenticated');
    }

    try {
      const payload = new JwtService().verify(token, {
        secret: this.configService.get('secret'),
      });

      const postData = { ...postDto, userId: payload.userId };

      await this.postRepository.create(postData);

      return res.json({ message: 'New post created' });
    } catch (err) {
      throw new Error('Invalid token');
    }
  }

  async getAllPosts(req: Request) {
    const token = req.cookies['jwt'];

    if (!token) {
      throw new Error('Not authenticated');
    }

    try {
      const payload = new JwtService().verify(token, {
        secret: this.configService.get('secret'),
      });

      return await this.postRepository.findAll({
        where: { userId: payload.userId },
      });
    } catch (err) {
      throw new Error('Problem with search');
    }
  }

  async updatePost(postDto: PostDto, id) {
    await this.postRepository.update(postDto, { where: { id } });
    return await this.postRepository.findOne({ where: { id } });
  }

  async deletePost(id) {
    await this.postRepository.destroy({ where: { id } });
    return true;
  }
}
