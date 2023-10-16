import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class GestStocksDTO {
  @IsOptional()
  @IsNumber()
  public state?: string;

  @IsDateString()
  @IsOptional()
  public value: Date;
}
