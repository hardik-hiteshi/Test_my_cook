// user.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAffiliateConfigDTO {
  @IsNotEmpty()
  @IsNumber()
  public cookieTime: number;

  @IsNotEmpty()
  @IsString()
  public cookieName: string;
}
