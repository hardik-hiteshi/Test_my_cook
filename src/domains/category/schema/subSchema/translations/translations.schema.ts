import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import From from './from.subschema';
import To from './to.subschema';

@Schema()
export class Translations {
  @Prop(From)
  from: From;
  @Prop([To])
  to: [To];
  @Prop()
  preserve: Boolean;
}
