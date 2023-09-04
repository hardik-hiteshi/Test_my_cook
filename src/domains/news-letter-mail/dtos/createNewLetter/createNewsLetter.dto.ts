import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { NewsLetterMailChimpDto } from './subDto/newsLetterMailChimp.dto';
import { NewsLetterMauticDto } from './subDto/newsLetterMautic.dto';
import { Type } from 'class-transformer';

export class CreateNewsLetterDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public emailAddress: string;

  @ValidateNested()
  @Type(() => NewsLetterMailChimpDto)
  public mailchimp: NewsLetterMailChimpDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => NewsLetterMauticDto)
  public mautic: NewsLetterMauticDto;
}
