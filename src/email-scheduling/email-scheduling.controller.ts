import { Body, Controller, UseGuards, Post } from '@nestjs/common';
import { EmailSchedulingService } from './email-scheduling.service';
import { EmailScheduleDto } from './dto/emailSchedule.dto';
import { JwtTwoFactorGuard } from 'src/authentication/jwt-two-factor.guard';

@Controller('email-scheduling')
export class EmailSchedulingController {
  constructor(
    private readonly emailSchedulingService: EmailSchedulingService,
  ) {}

  @Post('schedule')
  @UseGuards(JwtTwoFactorGuard)
  async scheduleEmail(@Body() emailSchedule: EmailScheduleDto) {
    this.emailSchedulingService.scheduleEmail(emailSchedule);
  }
}
