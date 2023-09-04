import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class NewsLetterMailChimpDto {
  @IsString()
  @IsNotEmpty()
  public mailchimpID: string;

  @IsDateString()
  @IsNotEmpty()
  public subscribeDate: Date;
}
