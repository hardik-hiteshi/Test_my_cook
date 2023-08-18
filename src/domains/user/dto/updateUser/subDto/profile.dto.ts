import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { SocialMediaDto } from './socialMedia.dto';

export class ProfileDto {
  @IsOptional()
  @IsString()
  public diet?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialMediaDto)
  public social?: SocialMediaDto;

  @IsOptional()
  @IsString()
  public about?: string;

  @IsOptional()
  @IsString()
  public birthday?: string;

  @IsOptional()
  @IsString()
  public language?: string;
}
