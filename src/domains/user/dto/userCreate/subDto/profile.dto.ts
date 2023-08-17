import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { SocialMediaDto } from './socialMedia.dto';

export class ProfileDto {
  @IsOptional()
  @IsString()
  diet?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialMediaDto)
  social?: SocialMediaDto;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsString()
  birthday?: string;

  @IsOptional()
  @IsString()
  language?: string;
}
