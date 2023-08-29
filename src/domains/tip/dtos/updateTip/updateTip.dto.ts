import { IsString, ValidateIf } from 'class-validator';
// import { Region } from '../enum/region.enum';

export class UpdateTipDto {
  @ValidateIf((o) => !o.region)
  @IsString()
  public text: string;

  // @ValidateIf((o) => !o.text)
  // @IsString()
  // @IsEnum(Region)
  // public region: string;
}
