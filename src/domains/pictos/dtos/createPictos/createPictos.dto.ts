import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePictosDto {
  @IsString()
  @IsNotEmpty()
  public niceName: string;

  @IsNotEmpty()
  @IsString({ each: true })
  public image: string[];
}
