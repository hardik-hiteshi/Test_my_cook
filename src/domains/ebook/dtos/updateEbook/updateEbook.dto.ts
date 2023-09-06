import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Schema } from 'mongoose';

export class UpdateEbookDTO {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsDateString()
  @IsNotEmpty()
  public publishDate: Date;

  @IsOptional()
  @IsString()
  public url: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  @IsMongoId({ each: true })
  public recipes?: Schema.Types.ObjectId[];

  @IsOptional()
  @IsNumber()
  public mauticFormId?: number;

  @IsOptional()
  public image?: Schema.Types.Mixed;

  @IsOptional()
  public pdf?: Schema.Types.Mixed;
}
