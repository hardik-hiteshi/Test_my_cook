import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as mongooseSchema } from 'mongoose';
import { Steps } from './steps.subschema';

@Schema({ _id: false })
export class Group {
  @Prop()
  public name: string;
  @Prop([{ type: mongooseSchema.Types.ObjectId, ref: 'Steps' }])
  public steps: Steps[];
}
