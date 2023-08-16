import { Schema, Prop } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Info {
  @Prop()
  creationDate: Date;
  @Prop()
  modificationDate: Date;
  @Prop()
  creationSource: string;
  @Prop()
  modificationSource: string;
}
