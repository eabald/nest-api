import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

class UpdatePostDto {
  @IsNumber()
  id: number;

  @IsString({ each: true })
  @IsNotEmpty()
  paragraphs: string[];

  @IsString()
  title: string;
}

export default UpdatePostDto;
