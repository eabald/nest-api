import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/createComment.dto';
import { ObjectWithIdDto } from '../utils/types/objectWithId.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async createComment(comment: CreateCommentDto, user: User) {
    const newPost = await this.commentsRepository.create({
      ...comment,
      author: user,
    });
    await this.commentsRepository.save(newPost);
    return newPost;
  }

  async getCommentsByPostId(post: ObjectWithIdDto) {
    const comments = await this.commentsRepository.find({ post });
    return comments;
  }
}
