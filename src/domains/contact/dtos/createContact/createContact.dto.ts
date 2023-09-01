import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public niceName: string;

  @IsOptional()
  public image?: Schema.Types.Mixed;

  @IsString()
  @IsNotEmpty()
  public contact1: string;

  @IsOptional()
  @IsString()
  public contact2?: string;

  @IsOptional()
  @IsString()
  public description?: string;
}
