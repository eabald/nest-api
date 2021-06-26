import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthenticationGuard } from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { CreateCommentDto } from './dto/createComment.dto';
import { CommentsService } from './comments.service';
import { Post as PostEntity } from 'src/posts/post.entity';

@Controller('comments')
@UseInterceptors(ClassSerializerInterceptor)
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createComment(
    @Body() comment: CreateCommentDto,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;
    return this.commentsService.createComment(comment, user);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getPostComments(@Body() post: PostEntity) {
    return this.commentsService.getCommentsByPostId(post);
  }
}
