import { IsString, IsNotEmpty } from 'class-validator';

export class CheckVerificationCodeDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
