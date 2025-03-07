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
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { PostDto } from './dto';
import { CreatePostResponse } from './response';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createPost(@Body() postDto: PostDto, @Req() request) {
    return this.postsService.createPost(postDto, request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-all-posts')
  getAllPosts(@Req() request) {
    return this.postsService.getAllPosts(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-post')
  updatePost(@Body() postDto: PostDto, @Query('id') id: number) {
    return this.postsService.updatePost(postDto, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-post')
  deletePost(@Query('id') id: number) {
    return this.postsService.deletePost(id);
  }
}
