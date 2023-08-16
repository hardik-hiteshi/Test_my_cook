import { Schema, Prop } from '@nestjs/mongoose';
import { Schema as mongooseSchema } from 'mongoose';
import { Steps } from './steps.subschema';

@Schema({ _id: false })
export class Group {
  @Prop()
  name: String;
  @Prop([{ type: mongooseSchema.Types.ObjectId, ref: 'Steps' }])
  steps: [Steps];
}
