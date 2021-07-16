import { Module } from '@nestjs/common';
import { EmailSchedulingService } from './email-scheduling.service';
import { EmailModule } from '../email/email.module';
import { EmailSchedulingController } from './email-scheduling.controller';

@Module({
  imports: [EmailModule],
  controllers: [EmailSchedulingController],
  providers: [EmailSchedulingService],
})
export class EmailSchedulingModule {}
