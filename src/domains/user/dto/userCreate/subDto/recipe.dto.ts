import { IsOptional, IsString } from 'class-validator';
export class RecipeDto {
  @IsOptional()
  @IsString()
  niceName?: string;

  @IsOptional()
  @IsString()
  title?: string;
}
