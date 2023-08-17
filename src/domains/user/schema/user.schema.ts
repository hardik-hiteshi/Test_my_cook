import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  Name,
  Contact,
  Profile,
  Location,
  History,
  Info,
  Status,
  ShopItem,
  Recipe,
  MemberConditions,
  CommunityConditions,
  OtherConditions,
  Translations,
} from './SubSchema/index';

export type UserDocument = HydratedDocument<User>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class User {
  @Prop(Name)
  name: Name;
  @Prop(Location)
  location: Location;
  @Prop(Contact)
  contact: Contact;
  @Prop(History)
  history: History;
  @Prop({ required: true })
  login: string;
  @Prop({ required: [true, 'Please provide a niceName'], unique: true })
  niceName: string;
  @Prop({ required: true })
  password: string;
  @Prop(Profile)
  profile: Profile;
  @Prop()
  image: string[];
  @Prop({ default: 'admin' })
  role: string;
  @Prop(Info)
  info: Info;
  @Prop()
  region: string;
  @Prop()
  allowedRegions: string[];
  @Prop()
  rank: string;
  @Prop(Status)
  status: Status;
  @Prop()
  badges: String[];
  @Prop()
  favorites: String[];
  @Prop()
  todo: String[];
  @Prop()
  grants: String[];
  @Prop(ShopItem)
  shopItem: ShopItem;
  @Prop()
  following: String[];
  @Prop(Recipe)
  recipeList: Recipe;
  @Prop(MemberConditions)
  memberConditions: MemberConditions;
  @Prop(CommunityConditions)
  communityConditions: CommunityConditions;
  @Prop(OtherConditions)
  newsletterConditions: OtherConditions;
  @Prop(OtherConditions)
  internationalConditions: OtherConditions;
  @Prop(OtherConditions)
  termsOfSale: OtherConditions;
  @Prop(OtherConditions)
  ebookConditions: OtherConditions;
  @Prop(OtherConditions)
  contactConditions: OtherConditions;
  @Prop(Translations)
  translations: Translations;
}
export const UserSchema = SchemaFactory.createForClass(User);
