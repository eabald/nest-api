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
import RequestWithUser from '../authentication/requestWithUser.interface';
import { CreateCommentDto } from './dto/createComment.dto';
import { CommentsService } from './comments.service';
import { Post as PostEntity } from 'src/posts/post.entity';
import { JwtTwoFactorGuard } from '../authentication/jwt-two-factor.guard';

@Controller('comments')
@UseInterceptors(ClassSerializerInterceptor)
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtTwoFactorGuard)
  async createComment(
    @Body() comment: CreateCommentDto,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;
    return this.commentsService.createComment(comment, user);
  }

  @Get()
  @UseGuards(JwtTwoFactorGuard)
  async getPostComments(@Body() post: PostEntity) {
    return this.commentsService.getCommentsByPostId(post);
  }
}
