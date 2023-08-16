import { IsString, IsOptional } from 'class-validator';

export class SourceDTO {
  @IsOptional()
  @IsString()
  url: String;

  @IsOptional()
  @IsString()
  name: String;
}
