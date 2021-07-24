import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { StripeWebhookController } from './stripe-webhook.controller';
import { StripeModule } from '../stripe/stripe.module';
import { StripeWebhookService } from './stripe-webhook.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeEvent } from './StripeEvent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StripeEvent]), UsersModule, StripeModule],
  controllers: [StripeWebhookController],
  providers: [StripeWebhookService],
})
export class StripeWebhookModule {}
