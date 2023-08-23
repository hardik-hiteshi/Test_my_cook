import { IsArray, IsOptional, IsString } from 'class-validator';
export class UpdateFeatureDTO {
  @IsOptional()
  @IsString()
  public region: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public featuredList: string[];

  @IsOptional()
  @IsString()
  public type: string;
}
