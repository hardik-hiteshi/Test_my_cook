import { Type } from 'class-transformer';
import { ConditionHistoryDto } from './conditionHistory.dto';
import { ValidateNested, IsDateString, IsOptional } from 'class-validator';

export class OtherConditionsDto {
  @IsOptional()
  @IsDateString()
  dateAgreement?: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ConditionHistoryDto)
  history?: ConditionHistoryDto[];
}
