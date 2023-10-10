import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostPageURLDTO {
  @IsNotEmpty()
  @IsString()
  public slug: string;

  @IsOptional()
  @IsString()
  public fullUrl?: string;
}
