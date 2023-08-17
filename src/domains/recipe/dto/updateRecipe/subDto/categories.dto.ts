import { IsString, IsOptional } from 'class-validator';

export class CategoriesDTO {
  @IsOptional()
  @IsString()
  name: String;
  @IsOptional()
  @IsString()
  niceName: String;
}
