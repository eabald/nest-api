import { Module } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from '../email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailConfirmationController } from './email-confirmation.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ConfigModule, EmailModule, JwtModule.register({}), UsersModule],
  providers: [EmailConfirmationService],
  exports: [EmailConfirmationService],
  controllers: [EmailConfirmationController],
})
export class EmailConfirmationModule {}
