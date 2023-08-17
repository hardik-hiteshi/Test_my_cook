import { IsOptional, IsString } from 'class-validator';
export class ShopItemDto {
  @IsOptional()
  @IsString()
  ingredient?: string;

  @IsOptional()
  @IsString()
  qty?: string;

  @IsOptional()
  @IsString()
  unit?: string;
}
