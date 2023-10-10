import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class HistoryStateDTO {
  @IsOptional()
  @IsString()
  public state?: string;

  @IsDateString()
  @IsNotEmpty()
  public date: Date;

  @IsOptional()
  @IsString()
  public comments?: string;

  @IsOptional()
  @IsString()
  public modificationUser?: string;
}
