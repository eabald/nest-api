import { IsString } from 'class-validator';

class CreatePostDto {
  @IsString()
  content: string;

  @IsString()
  title: string;
}

export default CreatePostDto;
