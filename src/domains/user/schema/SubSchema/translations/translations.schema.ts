import { Schema, Prop } from '@nestjs/mongoose';
import From from './from.schema';
import To from './to.schema';
@Schema({ _id: false })
export class Translations {
  @Prop(From)
  from: From;
  @Prop(To)
  to: To;
  @Prop()
  preserve: Boolean;
}
