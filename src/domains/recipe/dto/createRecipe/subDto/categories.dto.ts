import { IsString, IsOptional } from 'class-validator';

export class CategoriesDTO {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  niceName: string;
}
