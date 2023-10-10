import { IsOptional, IsString } from 'class-validator';

export class PostCategoryURLDTO {
  @IsOptional()
  @IsString()
  public slug: string;
}
