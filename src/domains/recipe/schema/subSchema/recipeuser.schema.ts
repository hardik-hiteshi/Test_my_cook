import { Schema, Prop } from '@nestjs/mongoose';
@Schema({ _id: false })
export class RecipeUser {
  @Prop()
  displayName: String;
  @Prop()
  niceName: String;
  @Prop()
  rank: String;
  @Prop()
  role: String;
  @Prop()
  instagram: String;
  @Prop()
  twitter: String;
  @Prop([String])
  images: [String];
  @Prop()
  web: String;
  @Prop()
  webName: String;
}
