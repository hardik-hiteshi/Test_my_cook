import {
  ArrayMinSize,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { HistoryStateDTO } from './subDto/HistoryStateDTO/historyState.dto';
import { LineDTO } from './subDto/LineDTO/line.dto';
import { ShippingAddressDTO } from './subDto/ShippingAddressDTO/shippingAddress.dto';
import { Type } from 'class-transformer';

export class CreateReturnedProductsDTO {
  @IsNotEmpty()
  @IsString()
  public orderId: string;

  @IsOptional()
  @IsDateString()
  public date: Date;

  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => LineDTO)
  public products: LineDTO[];

  @IsNotEmpty()
  @IsString()
  public state: string;

  @IsOptional()
  @IsString()
  public customer?: string;

  @IsOptional()
  public customerValue?:
    | string
    | number
    | boolean
    | Record<string, unknown>
    | null
    | undefined;

  @IsOptional()
  @IsString()
  public sapReturnNumber?: string;

  @IsOptional()
  @IsString()
  public carrierLink?: string;

  @IsNotEmpty()
  @IsString()
  public returnReason: string;

  @IsOptional()
  @IsString()
  public comments?: string;

  @ValidateNested({ each: true })
  @Type(() => ShippingAddressDTO)
  public shippingAddress: ShippingAddressDTO;

  @ValidateNested({ each: true })
  @Type(() => HistoryStateDTO)
  public historyState: HistoryStateDTO;
}
