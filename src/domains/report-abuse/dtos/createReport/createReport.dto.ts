import {
  IsDateString,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Schema } from 'mongoose';

export class CreateReportDto {
  @IsString()
  @IsIn(['recipe', 'comment', 'rating'])
  @IsNotEmpty()
  public type: string;

  @IsOptional()
  @IsString()
  public reportingUserNiceName?: string;

  @IsOptional()
  @IsString()
  public reportedRecipeNiceName?: string;

  @IsString()
  @IsNotEmpty()
  public reportedUserNiceName: string;

  @IsOptional()
  @IsString()
  public reportedText?: string;

  @IsOptional()
  @IsString()
  public reportAdditionalDescription?: string;

  @IsOptional()
  @IsDateString()
  public reportDate?: Date;

  @IsOptional()
  @IsString()
  public managerComment?: string;

  @IsOptional()
  @IsMongoId()
  public elementId?: Schema.Types.ObjectId;
}
