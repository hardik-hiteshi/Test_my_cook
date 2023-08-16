import { Schema, Prop } from '@nestjs/mongoose';
@Schema({ _id: false })
export class Name {
  @Prop()
  displayName: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
}
