import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StripeEvent } from './StripeEvent.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import Stripe from 'stripe';
import { PostgresErrorCode } from '../database/postgresErrorCodes.enum';

@Injectable()
export class StripeWebhookService {
  constructor(
    @InjectRepository(StripeEvent)
    private eventsRepository: Repository<StripeEvent>,
    private readonly usersService: UsersService,
  ) {}

  createEvent(id: string) {
    return this.eventsRepository.insert({ id });
  }

  async processSubscriptionUpdate(event: Stripe.Event) {
    try {
      await this.createEvent(event.id);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('This event was already processed');
      }
    }

    const data = event.data.object as Stripe.Subscription;

    const customerId: string = data.customer as string;
    const subscriptionStatus = data.status;

    await this.usersService.updateMonthlySubscriptionStatus(
      customerId,
      subscriptionStatus,
    );
  }
}
