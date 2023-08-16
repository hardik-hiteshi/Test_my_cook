import { IsString, IsOptional, IsArray } from 'class-validator';

export class RecipeUserDTO {
  @IsOptional()
  @IsString()
  displayName: String;

  @IsOptional()
  @IsString()
  niceName: String;

  @IsOptional()
  @IsString()
  rank: String;

  @IsOptional()
  @IsString()
  role: String;

  @IsOptional()
  @IsString()
  instagram: String;

  @IsOptional()
  @IsString()
  twitter: String;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsOptional()
  @IsString()
  web: String;

  @IsOptional()
  @IsString()
  webName: String;
}
