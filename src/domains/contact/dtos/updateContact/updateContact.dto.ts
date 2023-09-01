import { IsOptional, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class UpdateContactDto {
  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  public image?: Schema.Types.Mixed;

  @IsOptional()
  @IsString()
  public contact1?: string;

  @IsOptional()
  @IsString()
  public contact2?: string;

  @IsOptional()
  @IsString()
  public description?: string;
}
