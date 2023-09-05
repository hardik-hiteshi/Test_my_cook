import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { AuthorSocial } from './subschema/author.social.subschema';

export type AuthorDocument = HydratedDocument<Author>;

@Schema({
  id: false,
})
export class Author {
  @Prop()
  public uniqueId: string;

  @Prop({ required: true, unique: true })
  public username: string;

  @Prop(AuthorSocial)
  public social: AuthorSocial;

  @Prop([String])
  public image: string[];

  @Prop()
  public bio: string;
  @Prop({ default: true })
  public isActive: boolean;
}
export const authorSchema = SchemaFactory.createForClass(Author);
