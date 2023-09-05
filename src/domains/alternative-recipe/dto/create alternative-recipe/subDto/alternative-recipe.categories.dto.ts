import { IsOptional, IsString } from 'class-validator';
export class CategoriesDTO {
  @IsOptional()
  @IsString()
  public name: string;
  @IsOptional()
  @IsString()
  public niceName: string;
}
