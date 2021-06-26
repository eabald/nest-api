import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import { JwtAuthenticationGuard } from '../authentication/jwt-authentication.guard';
import { FindOneParams } from '../utils/findOneParams';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { PaginationParams } from '../utils/types/paginationParams';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(
    @Query('search') search: string,
    @Query() { offset, limit }: PaginationParams,
  ) {
    if (search) {
      return this.postsService.searchForPosts(search, offset, limit);
    }
    return this.postsService.getAllPosts(offset, limit);
  }

  @Get(':id')
  getPostById(@Param('id') id: FindOneParams) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postsService.createPost(post, req.user);
  }

  @Put(':id')
  @UseGuards(JwtAuthenticationGuard)
  async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  async deletePost(@Param('id') id: string) {
    this.postsService.deletePost(Number(id));
  }
}
