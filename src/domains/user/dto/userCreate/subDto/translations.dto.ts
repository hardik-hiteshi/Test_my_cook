import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FromDto } from './from.dto';
import { ToDto } from './to.dto';
export class TranslationsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => FromDto)
  from?: FromDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ToDto)
  to?: ToDto;

  @IsOptional()
  @IsBoolean()
  preserve?: boolean;
}
