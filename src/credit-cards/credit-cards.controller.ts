import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  Get,
  HttpCode,
} from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { JwtAuthenticationGuard } from '../authentication/jwt-authentication.guard';
import { RequestWithUser } from '../authentication/requestWithUser.interface';
import { AddCreditCardDto } from './dto/addCreditCard.dto';
import { SetDefaultCreditCardDto } from './dto/setDefaultCreditCard.dto';

@Controller('credit-cards')
export class CreditCardsController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async addCreditCard(
    @Body() creditCard: AddCreditCardDto,
    @Req() request: RequestWithUser,
  ) {
    return this.stripeService.attachCreditCard(
      creditCard.paymentMethodId,
      request.user.stripeCustomerId,
    );
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getCreditCards(@Req() request: RequestWithUser) {
    return this.stripeService.listCreditCards(request.user.stripeCustomerId);
  }

  @Post('default')
  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  async setDefaultCard(
    @Body() creditCard: SetDefaultCreditCardDto,
    @Req() request: RequestWithUser,
  ) {
    await this.stripeService.setDefaultCreditCard(
      creditCard.paymentMethodId,
      request.user.stripeCustomerId,
    );
  }
}
