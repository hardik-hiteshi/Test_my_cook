import { IsString, IsOptional, IsDateString } from 'class-validator';

export class InfoDTO {
  @IsOptional()
  @IsDateString()
  @IsString()
  creationDate: Date;

  @IsOptional()
  @IsDateString()
  @IsString()
  modificationDate: Date;

  @IsOptional()
  @IsString()
  creationSource: String;

  @IsOptional()
  @IsString()
  modificationSource: String;
}
