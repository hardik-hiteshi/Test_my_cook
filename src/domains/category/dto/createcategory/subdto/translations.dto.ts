import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { FromDTO } from './from.subdto';
import { ToDTO } from './to.subdto';
import { Type } from 'class-transformer';
export class TranslationsDTO {
  @IsOptional()
  @ValidateNested()
  @Type(() => FromDTO)
  public from: FromDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => ToDTO)
  public to: ToDTO[];

  @IsOptional()
  @IsBoolean()
  public preserve: boolean;
}
