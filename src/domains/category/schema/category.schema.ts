import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import categoryRegions from './subSchema/enums/Categoryregion.enum';
import { HydratedDocument } from 'mongoose';
import { Translations } from './subSchema/index';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({
    type: String,
    // readonly: true,
  })
  public niceName: string;

  @Prop({ type: String, format: 'mycook-image' })
  public image: string;

  @Prop({ type: Boolean, default: false })
  public visibility: boolean;

  @Prop({
    type: String,
    required: true,
    enum: categoryRegions,
  })
  public region: string;

  @Prop({
    type: String,
    // format: 'html',
  })
  public landingText: string;

  @Prop([{ type: String }])
  public synonyms: string[];

  @Prop(Translations)
  public translations: Translations;
  @Prop({ default: true })
  public isActive: boolean;
}

export const categorySchema = SchemaFactory.createForClass(Category);
