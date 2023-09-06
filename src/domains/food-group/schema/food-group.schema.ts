import { HydratedDocument, Schema as mongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import regions from 'src/common/enum/region.enum';
import { Translations } from './subSchema/translate.subSchema';

export type FoodGroupDocument = HydratedDocument<FoodGroup>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class FoodGroup {
  @Prop({ required: true })
  public niceName: string;

  @Prop()
  public name: string;

  @Prop({ required: true, enum: regions })
  public region: string;

  @Prop()
  public mustShow: boolean;

  @Prop({ type: mongoSchema.Types.Mixed })
  public image: mongoSchema.Types.Mixed;

  @Prop()
  public translations: Translations;

  @Prop({ default: true })
  public isActive: boolean;
}
export const foodGroupSchema = SchemaFactory.createForClass(FoodGroup);
