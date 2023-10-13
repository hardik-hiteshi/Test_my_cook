import {
  ArrayMinSize,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { DetailDTO } from '../DetailsDTO/detail.dto';
import { Type } from 'class-transformer';

export class TotalTaxesDTO {
  @IsOptional()
  @IsNumber()
  public total?: number;

  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => DetailDTO)
  public detail: DetailDTO[];
}
