import { IsArray, IsOptional, IsString } from 'class-validator';
export class GrantsDTO {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public view: [string];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public search: [string];
}
