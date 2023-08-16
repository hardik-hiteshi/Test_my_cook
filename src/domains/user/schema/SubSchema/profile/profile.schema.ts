import { Schema, Prop } from '@nestjs/mongoose';
import { SocialMedia } from './socialmedia.subschema';
@Schema({ _id: false })
export class Profile {
  @Prop()
  diet: String;
  @Prop(SocialMedia)
  social: SocialMedia;
  @Prop()
  about: String;
  @Prop()
  birthday: String;
  @Prop()
  language: String;
}