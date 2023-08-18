import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export class RecipeUser {
  @Prop()
  public displayName: string;
  @Prop()
  public niceName: string;
  @Prop()
  public rank: string;
  @Prop()
  public role: string;
  @Prop()
  public instagram: string;
  @Prop()
  public twitter: string;
  @Prop([String])
  public images: [string];
  @Prop()
  public web: string;
  @Prop()
  public webName: string;
}
