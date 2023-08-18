import { IsArray, IsOptional, IsString } from 'class-validator';

export class RecipeUserDTO {
  @IsOptional()
  @IsString()
  public displayName: string;

  @IsOptional()
  @IsString()
  public niceName: string;

  @IsOptional()
  @IsString()
  public rank: string;

  @IsOptional()
  @IsString()
  public role: string;

  @IsOptional()
  @IsString()
  public instagram: string;

  @IsOptional()
  @IsString()
  public twitter: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public images: string[];

  @IsOptional()
  @IsString()
  public web: string;

  @IsOptional()
  @IsString()
  public webName: string;
}
