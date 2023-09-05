import { IsOptional, IsString } from 'class-validator';

export class CreateAuthorSocialDTO {
  @IsOptional()
  @IsString()
  public glpus: string;
  @IsOptional()
  @IsString()
  public twitter: string;
  @IsOptional()
  @IsString()
  public instagram: string;
}
