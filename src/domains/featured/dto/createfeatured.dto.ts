import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateFeatureDTO {
  @IsNotEmpty()
  @IsString()
  public region: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public featuredList: string[];

  @IsNotEmpty()
  @IsString()
  public type: string;
}
