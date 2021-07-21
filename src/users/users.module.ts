import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FilesModule } from '../files/files.module';
import { UsersController } from './users.controller';
import { PrivateFilesModule } from '../privateFiles/privateFiles.module';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    FilesModule,
    PrivateFilesModule,
    StripeModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
