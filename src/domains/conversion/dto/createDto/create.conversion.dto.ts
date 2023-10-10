// user.dto.ts
import {
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Schema as mongooseSchema } from 'mongoose';

export class CreateConversionDTO {
  @IsMongoId()
  @IsOptional()
  public affiliate?: mongooseSchema.Types.ObjectId;

  @IsOptional()
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public lastName: string;

  @IsOptional()
  @IsString()
  public customerName: string;

  @IsOptional()
  @IsString()
  public customerLastName: string;

  @IsOptional()
  @IsMongoId()
  public order: mongooseSchema.Types.ObjectId;

  @IsOptional()
  @IsString()
  public date: Date;

  @IsOptional()
  @IsNumber()
  public total: number;

  @IsOptional()
  @IsNumber()
  public income: number;

  @IsOptional()
  public conversionTax: number;

  @IsBoolean()
  public invoiced: boolean;

  @IsBoolean()
  public returned: boolean;

  @IsOptional()
  @IsString()
  public companyName: string;

  @IsOptional()
  @IsString()
  public cif: string;
}
