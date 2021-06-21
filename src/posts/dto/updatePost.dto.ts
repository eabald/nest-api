import { IsString, IsNumber } from 'class-validator';

class UpdatePostDto {
  @IsNumber()
  id: number;

  @IsString()
  content: string;

  @IsString()
  title: string;
}

export default UpdatePostDto;
