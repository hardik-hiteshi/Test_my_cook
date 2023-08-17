import { IsOptional, IsString } from 'class-validator';
export class LocationDto {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  zip?: string;

  @IsOptional()
  @IsString()
  town?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;
}
