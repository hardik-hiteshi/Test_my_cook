import { IsNotEmpty, IsString } from 'class-validator';
// import { Region } from '../enum/region.enum';

export class CreateTipDto {
  @IsString()
  @IsNotEmpty()
  public text: string;

  // @IsString()
  // @IsEnum(Region)
  // @IsNotEmpty()
  // public region: string;
}
