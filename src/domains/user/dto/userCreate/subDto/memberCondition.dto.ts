import { IsDateString, IsBoolean, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ConditionHistoryDto } from './conditionHistory.dto';

export class MemberConditionsDto {
  @IsOptional()
  @IsDateString()
  dateAgreement?: Date;

  @IsOptional()
  @IsBoolean()
  agree?: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ConditionHistoryDto)
  history?: ConditionHistoryDto[];
}
