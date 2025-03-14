import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto';
import { CreatePostResponse } from './response';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Request, Response } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createPost(
    @Body() postDto: PostDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.postsService.createPost(postDto, req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-all-posts')
  getAllPosts(@Req() req: Request) {
    return this.postsService.getAllPosts(req);
  }

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
