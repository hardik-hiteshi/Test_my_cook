import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import badgesNiceNames from './subSchema/enums/BadgesNicenames.enum';
import BadgesRegions from './subSchema/enums/BadgesRegion.enums';
import { Translations } from './subSchema/index';

export type MachineModelDocument = HydratedDocument<Badges>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class Badges {
  @Prop()
  name: String;

  @Prop({
    type: String,
    enum: badgesNiceNames,
    limitToOptions: false,
    editOnCreate: true,
    description:
      'Automatic badges NiceNames are: recipes_0, recipes_5, recipes_10, recipes_25, recipes_50, video_1, video_5, video_10, comments_10, comments_25, comments_50, comments_100',
  })
  niceName: String;

  @Prop({ title: 'Index' })
  index: Number;

  @Prop({ format: 'mycook-image' })
  image: String;

  @Prop({
    type: String,
    required: true,
    title: 'Range',
    description:
      'When the user will be given the badge, i.e When you publish 10 recipes.',
  })
  range: String;

  @Prop({
    type: String,
    required: true,
    title: 'Description',
    description: 'Long text explaining the badge.',
  })
  description: String;

  @Prop({ type: String, format: 'html', title: 'Prize text' })
  prize_txt: String;

  @Prop({ type: String, title: 'Prize' })
  prize: String;

  @Prop({ type: String, title: 'Terms' })
  terms: String;

  @Prop({ type: String, required: true, enum: BadgesRegions, title: 'Region' })
  region: String;

  @Prop(Translations)
  translations: Translations;
}
export const BadgesSchema = SchemaFactory.createForClass(Badges);
