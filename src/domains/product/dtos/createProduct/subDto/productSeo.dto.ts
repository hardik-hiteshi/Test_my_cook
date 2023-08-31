import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class ProductSeoDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  public title?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  public description?: string;

  @IsOptional()
  @IsBoolean()
  public index?: boolean;

  @IsOptional()
  @IsBoolean()
  public follow?: boolean;
}
