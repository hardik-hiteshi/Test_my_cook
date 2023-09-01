import { IsNotEmpty, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class CreatePictosDto {
  @IsString()
  @IsNotEmpty()
  public niceName: string;

  @IsNotEmpty()
  public image: Schema.Types.Mixed;
}
