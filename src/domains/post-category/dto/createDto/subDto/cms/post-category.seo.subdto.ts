import { IsOptional, IsString } from 'class-validator';

export class PostCategorySEODTO {
  @IsOptional()
  @IsString()
  public title: string;

  @IsOptional()
  @IsString()
  public description: string;
}
