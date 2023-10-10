import {
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateConversionDTO } from '../createDto/create.conversion.dto';
import { Schema as mongooseSchema } from 'mongoose';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateConversionDTO extends PartialType(CreateConversionDTO) {
  @IsOptional()
  @IsMongoId()
  public affiliate?: mongooseSchema.Types.ObjectId;

  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public lastName?: string;

  @IsOptional()
  @IsString()
  public customerName?: string;

  @IsOptional()
  @IsString()
  public customerLastName?: string;

  @IsOptional()
  @IsMongoId()
  public order?: mongooseSchema.Types.ObjectId;

  @IsOptional()
  @IsString()
  public date?: Date;

  @IsOptional()
  @IsNumber()
  public total?: number;

  @IsOptional()
  @IsNumber()
  public income?: number;

  @IsOptional()
  @IsNumber()
  public conversionTax?: number;

  @IsOptional()
  @IsBoolean()
  public invoiced?: boolean;

  @IsOptional()
  @IsBoolean()
  public returned?: boolean;

  @IsOptional()
  @IsString()
  public companyName?: string;

  @IsOptional()
  @IsString()
  public cif?: string;
}
