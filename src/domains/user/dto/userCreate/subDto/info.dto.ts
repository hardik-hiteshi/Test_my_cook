import { IsString, IsDateString, IsOptional } from 'class-validator';
export class InfoDto {
  @IsOptional()
 @IsDateString()
  creationDate?: Date;
  @IsOptional()
 @IsDateString()
  modificationDate?: Date;

  @IsOptional()
  @IsString()
  creationSource?: string;

  @IsOptional()
  @IsString()
  modificationSource?: string;
}
