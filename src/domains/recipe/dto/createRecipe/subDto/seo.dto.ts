import { IsString, IsOptional } from 'class-validator';

export class SeoDTO {
  @IsOptional()
  @IsString()
  name: String;
  @IsOptional()
  @IsString()
  niceName: String;
}
