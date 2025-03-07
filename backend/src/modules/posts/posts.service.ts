import { Injectable } from '@nestjs/common';
import { Post } from './models/post.model';
import { InjectModel } from '@nestjs/sequelize';
import { PostDto } from './dto';
import { CreatePostResponse } from './response';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postRepository: typeof Post,
  ) {}

  async createPost(postDto: PostDto, user) {
    const postData = {
      user: user.id,
      discription: postDto.discription,
    };

    return await this.postRepository.create(postData);
  }

  async getAllPosts(user) {
    return await this.postRepository.findAll({ where: { user: user.id } });
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
