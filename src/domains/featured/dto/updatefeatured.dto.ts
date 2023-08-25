import { IsArray, IsOptional, IsString } from 'class-validator';
export class UpdateFeatureDTO {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public featuredList: string[];

  @IsOptional()
  @IsString()
  public type: string;
}
