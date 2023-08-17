import { IsString, IsOptional, IsNumber } from 'class-validator';

export class SocialDTO {
  @IsOptional()
  @IsNumber()
  favorite: Number;

  @IsOptional()
  @IsNumber()
  facebook: Number;

  @IsOptional()
  @IsNumber()
  comments: Number;

  @IsOptional()
  @IsNumber()
  ratings: Number;

  @IsOptional()
  @IsNumber()
  todo: Number;
}
