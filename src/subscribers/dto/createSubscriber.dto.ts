import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSubscriberDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
