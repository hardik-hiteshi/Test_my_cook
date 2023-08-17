import { IsString, IsDateString, IsOptional } from 'class-validator';
export class ConditionHistoryDto {
  @IsOptional()
  @IsDateString()
  dateAgreement?: Date;
  @IsOptional()
  @IsString()
  version?: string;
}
