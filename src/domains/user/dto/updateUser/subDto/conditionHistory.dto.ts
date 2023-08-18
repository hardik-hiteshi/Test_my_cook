import { IsDateString, IsOptional, IsString } from 'class-validator';
export class ConditionHistoryDto {
  @IsOptional()
  @IsDateString()
  public dateAgreement?: Date;
  @IsOptional()
  @IsString()
  public version?: string;
}
