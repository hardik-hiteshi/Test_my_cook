import {
  CommunityConditions,
  Contact,
  History,
  Info,
  Location,
  MemberConditions,
  Name,
  OtherConditions,
  Profile,
  Recipe,
  ShopItem,
  Status,
  Translations,
} from './SubSchema/index';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class User {
  @Prop(Name)
  public name: Name;
  @Prop(Location)
  public location: Location;
  @Prop(Contact)
  public contact: Contact;
  @Prop(History)
  public history: History;
  @Prop({ required: true })
  public login: string;
  @Prop({ required: [true, 'Please provide a niceName'] })
  public niceName: string;
  @Prop({ required: true })
  public password: string;
  @Prop(Profile)
  public profile: Profile;
  @Prop()
  public image: string[];
  @Prop({ default: 'admin' })
  public role: string;
  @Prop(Info)
  public info: Info;
  @Prop()
  public region: string;
  @Prop()
  public allowedRegions: string[];
  @Prop()
  public rank: string;
  @Prop(Status)
  public status: Status;
  @Prop()
  public badges: string[];
  @Prop()
  public favorites: string[];
  @Prop()
  public todo: string[];
  @Prop()
  public grants: string[];
  @Prop(ShopItem)
  public shopItem: ShopItem;
  @Prop()
  public following: string[];
  @Prop([Recipe])
  public recipeList: Recipe[];
  @Prop(MemberConditions)
  public memberConditions: MemberConditions;
  @Prop(CommunityConditions)
  public communityConditions: CommunityConditions;
  @Prop(OtherConditions)
  public newsletterConditions: OtherConditions;
  @Prop(OtherConditions)
  public internationalConditions: OtherConditions;
  @Prop(OtherConditions)
  public termsOfSale: OtherConditions;
  @Prop(OtherConditions)
  public ebookConditions: OtherConditions;
  @Prop(OtherConditions)
  public contactConditions: OtherConditions;
  @Prop(Translations)
  public translations: Translations;
  @Prop({ default: true, type: Boolean, required: true })
  public isActive: boolean;
}
export const userSchema = SchemaFactory.createForClass(User);
