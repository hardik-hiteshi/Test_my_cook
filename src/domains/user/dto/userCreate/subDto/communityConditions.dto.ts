import { ConditionHistoryDto } from './conditionHistory.dto';
import { IsDateString, ValidateNested, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
export class CommunityConditionsDto {
  @IsOptional()
  @IsDateString()
  dateAgreement?: Date;

  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ConditionHistoryDto)
  history?: ConditionHistoryDto[];
}
