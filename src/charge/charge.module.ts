import { Module } from '@nestjs/common';
import { StripeService } from 'src/stripe/stripe.service';
import { ChargeController } from './charge.controller';

@Module({
  imports: [StripeService],
  controllers: [ChargeController],
})
export class ChargeModule {}
