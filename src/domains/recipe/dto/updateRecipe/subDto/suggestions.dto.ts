import { IsOptional, IsString } from 'class-validator';
export class SuggestionsDTO {
  @IsOptional()
  @IsString()
  public title: string;

  @IsOptional()
  @IsString()
  public niceName: string;
}
