import { IsBoolean, IsOptional } from 'class-validator';
export class StatusDto {
  @IsOptional()
  @IsBoolean()
  promo?: boolean;

  @IsOptional()
  @IsBoolean()
  advertisement?: boolean;

  @IsOptional()
  @IsBoolean()
  taurusInfo?: boolean;

  @IsOptional()
  @IsBoolean()
  commercials?: boolean;

  @IsOptional()
  @IsBoolean()
  newsletter?: boolean;

  @IsOptional()
  @IsBoolean()
  publicProfile?: boolean;

  @IsOptional()
  @IsBoolean()
  feedback?: boolean;

  @IsOptional()
  @IsBoolean()
  privacy?: boolean;
}
