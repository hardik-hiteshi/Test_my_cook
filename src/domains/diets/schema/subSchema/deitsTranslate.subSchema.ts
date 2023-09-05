import { Prop, Schema } from '@nestjs/mongoose';
import { DietFrom } from './DietsFrom.subSchema';
import { DietTo } from './dietTo.subSchema';

@Schema()
export class DietTranslate {
  @Prop()
  public from: DietFrom;

  @Prop([DietTo])
  public to: DietTo;

  @Prop()
  public preserve: boolean;
}
