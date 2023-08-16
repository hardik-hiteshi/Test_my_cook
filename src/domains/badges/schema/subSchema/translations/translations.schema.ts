import { Schema, Prop } from '@nestjs/mongoose';
import From from './from.subschema';
import To from './to.subschema';
@Schema({ _id: false })
export class Translations {
  @Prop(From)
  from: From;
  @Prop([To])
  to: [To];
  @Prop()
  preserve: Boolean;
}
