import { Prop, Schema } from '@nestjs/mongoose';
import { Ingredient } from './ingredients.subschema';
import { Schema as mongooseSchema } from 'mongoose';

@Schema({ _id: false })
export class Steps {
  @Prop()
  public description: string;
  @Prop({
    default: 'mycook',
    enum: [
      'mycook',
      'bake',
      'fry',
      'coat',
      'manipulation',
      'repose',
      'stew',
      'microwave',
    ],
  })
  public type: string;

  @Prop()
  public cookTime: number;
  @Prop()
  public stepTime: number;
  @Prop()
  public temperature: number;
  @Prop()
  public outsideTemperature: number;
  @Prop()
  public microwaveWatts: number;
  @Prop()
  public speed: string;
  @Prop({
    enum: [
      'normal',
      'saute',
      'knead',
      'turbo',
      'progressive',
      'slow-cook',
      'sous-vide',
      'high-temperature',
      'steam',
      'kettle',
    ],
  })
  public function: string;
  @Prop()
  public accessories: string[];
  @Prop({ type: mongooseSchema.Types.ObjectId, ref: Ingredient })
  public ingredients: mongooseSchema.Types.ObjectId[];

  @Prop({ default: false })
  public haveImage: boolean;
}
