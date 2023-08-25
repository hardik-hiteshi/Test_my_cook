import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { RankTranslationsFromDTO } from './from.subdto';
import { RankTranslationsToDTO } from './to.subdto';
import { Type } from 'class-transformer';

export class RankTranslationsDTO {
  @IsOptional()
  @ValidateNested()
  @Type(() => RankTranslationsFromDTO)
  public from: RankTranslationsFromDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => RankTranslationsToDTO)
  public to: RankTranslationsToDTO[];

  @IsOptional()
  @IsBoolean()
  public preserve: boolean;
}
