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
  UseInterceptors,
  CacheKey,
  CacheTTL,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import { FindOneParams } from '../utils/findOneParams';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { PaginationParams } from '../utils/types/paginationParams';
import { GET_POSTS_CACHE_KEY } from './postsCacheKey.constant';
import { HttpCacheInterceptor } from './httpCache.interceptor';
import { JwtTwoFactorGuard } from 'src/authentication/jwt-two-factor.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey(GET_POSTS_CACHE_KEY)
  @CacheTTL(120)
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
  @UseGuards(JwtTwoFactorGuard)
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postsService.createPost(post, req.user);
  }

  @Put(':id')
  @UseGuards(JwtTwoFactorGuard)
  async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  @UseGuards(JwtTwoFactorGuard)
  async deletePost(@Param('id') id: string) {
    this.postsService.deletePost(Number(id));
  }
}
