import { IsString, IsOptional } from 'class-validator';

export class FromDto {
  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  niceName?: string;
}
