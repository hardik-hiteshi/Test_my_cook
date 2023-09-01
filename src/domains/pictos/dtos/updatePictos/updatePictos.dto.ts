import { IsNotEmpty } from 'class-validator';
import { Schema } from 'mongoose';

export class UpdatePictosDto {
  @IsNotEmpty()
  public image: Schema.Types.Mixed;
}
