import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PostTagUrlDto } from '../createDto/subDto/PostTagUrl.dto';

export class UpdatePostTagDTO {
  @IsNotEmpty()
  @IsString()
  public text: string;

  @IsString()
  public description: string;

  @IsOptional()
  public cms: PostTagUrlDto;

  // @IsNotEmpty()
  // public region: string;
}
