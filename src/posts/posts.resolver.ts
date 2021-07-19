import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  Resolver,
  ResolveField,
  Subscription,
} from '@nestjs/graphql';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';
import { CreatePostInput } from './inputs/post.input';
import { UseGuards } from '@nestjs/common';
import { RequestWithUser } from '../authentication/requestWithUser.interface';
import { GraphqlJwtAuthGuard } from '../authentication/graphql-jwt-auth.guard';
import { User } from '../users/models/user.model';
import { PostsLoaders } from './loaders/posts.loader';
import { Inject } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from '../pub-sub/pub-sub.module';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    private postsLoaders: PostsLoaders,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @Query(() => [Post])
  async posts() {
    const posts = await this.postsService.getAllPosts();
    return posts.items;
  }

  @Mutation(() => Post)
  @UseGuards(GraphqlJwtAuthGuard)
  async createPost(
    @Args('input') createPostInput: CreatePostInput,
    @Context() context: { req: RequestWithUser },
  ) {
    const newPost = await this.postsService.createPost(
      createPostInput,
      context.req.user,
    );
    this.pubSub.publish('POST_ADDED_EVENT', { postAdded: newPost });
    return newPost;
  }

  @ResolveField('author', () => User)
  async getAuthor(@Parent() post: Post) {
    const { authorId } = post;

    return this.postsLoaders.batchAuthors.load(authorId);
  }

  @Subscription(() => Post, {
    filter: (payload) => payload.postAdded.title === 'Hello world!',
  })
  postAdded() {
    return this.pubSub.asyncIterator('POST_ADDED_EVENT');
  }
}
