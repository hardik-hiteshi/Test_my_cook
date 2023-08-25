import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateFeatureDTO {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public featuredList: string[];

  @IsNotEmpty()
  @IsString()
  public type: string;
}
