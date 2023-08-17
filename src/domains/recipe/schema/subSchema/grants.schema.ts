import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Grants {
  @Prop([{ type: String }])
  view: String[];

  @Prop([{ type: String }])
  search: String[];
}

export const GrantsSchema = SchemaFactory.createForClass(Grants);
