import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto';
import { CreatePostResponse } from './response';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  createPost(@Body() postDto: PostDto, @Req() request) {
    return this.postsService.createPost(postDto, request.user);
  }

  @Get('get-all-posts')
  getAllPosts(@Req() request) {
    return this.postsService.getAllPosts(request.user);
  }

  @Patch('update-post')
  updatePost(@Body() postDto: PostDto, @Query('id') id: number) {
    return this.postsService.updatePost(postDto, id);
  }

  @Delete('delete-post')
  deletePost(@Query('id') id: number) {
    return this.postsService.deletePost(id);
  }
}
