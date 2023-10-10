import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateAffiliateConfigDTO } from '../createDto/createAffiliateConfig.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAffiliateConfigDTO extends PartialType(
  CreateAffiliateConfigDTO,
) {
  @IsNotEmpty()
  @IsNumber()
  public cookieTime: number;

  @IsNotEmpty()
  @IsString()
  public cookieName: string;
}
