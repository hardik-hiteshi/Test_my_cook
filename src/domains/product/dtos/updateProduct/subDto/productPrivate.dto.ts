import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class ProductPrivateDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  public brand?: string;

  @IsOptional()
  @IsNumber()
  public cost?: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  public internalReference?: string;
}
