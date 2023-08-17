import { IsString, IsOptional, IsArray } from 'class-validator';

export class GrantsDTO {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  view: [String];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  search: [String];
}
