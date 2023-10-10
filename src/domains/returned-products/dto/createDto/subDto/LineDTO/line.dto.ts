import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class LineDTO {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  public quantity: number;

  @IsNotEmpty()
  public productId: string;

  @IsString()
  @IsOptional()
  public name?: string;
}
