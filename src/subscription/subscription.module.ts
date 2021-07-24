import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { StripeModule } from '../stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, StripeModule],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
