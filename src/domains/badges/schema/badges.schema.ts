import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import badgesNiceNames from './subSchema/enums/BadgesNicenames.enum';
import badgesRegions from './subSchema/enums/BadgesRegion.enums';
import { HydratedDocument } from 'mongoose';
import { Translations } from './subSchema/index';

export type BadgesDocument = HydratedDocument<Badges>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class Badges {
  @Prop()
  public name: string;

  @Prop({
    type: String,
    enum: badgesNiceNames,
    limitToOptions: false,
    editOnCreate: true,
    description:
      'Automatic badges NiceNames are: recipes_0, recipes_5, recipes_10, recipes_25, recipes_50, video_1, video_5, video_10, comments_10, comments_25, comments_50, comments_100',
  })
  public niceName: string;

  @Prop({ title: 'Index' })
  public index: number;

  @Prop({ format: 'mycook-image' })
  public image: string;

  @Prop({
    type: String,
    required: true,
    title: 'Range',
    description:
      'When the user will be given the badge, i.e When you publish 10 recipes.',
  })
  public range: string;

  @Prop({
    type: String,
    required: true,
    title: 'Description',
    description: 'Long text explaining the badge.',
  })
  public description: string;

  @Prop({ type: String, format: 'html', title: 'Prize text' })
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public prize_txt: string;

  @Prop({ type: String, title: 'Prize' })
  public prize: string;

  @Prop({ type: String, title: 'Terms' })
  public terms: string;

  @Prop({ type: String, required: true, enum: badgesRegions, title: 'Region' })
  public region: string;

  @Prop(Translations)
  public translations: Translations;
}
export const badgesSchema = SchemaFactory.createForClass(Badges);
