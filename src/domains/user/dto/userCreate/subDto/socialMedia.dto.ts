import { IsOptional, IsString } from 'class-validator';

export class SocialMediaDto {
  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  googleplus?: string;

  @IsOptional()
  @IsString()
  twitter?: string;

  @IsOptional()
  @IsString()
  web?: string;

  @IsOptional()
  @IsString()
  webName?: string;
}
