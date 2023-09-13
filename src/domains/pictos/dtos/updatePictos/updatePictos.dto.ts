import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePictosDto {
  @IsNotEmpty()
  @IsString({ each: true })
  public image: string[];
}
