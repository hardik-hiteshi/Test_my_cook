import { Prop, Schema } from '@nestjs/mongoose';
import { Ingredient } from './ingredients.subschema';
import { Schema as mongooseSchema } from 'mongoose';

@Schema({ _id: false })
export class Steps {
  @Prop()
  public description: string;
  @Prop()
  public cookTime: number;
  @Prop([{ type: mongooseSchema.Types.ObjectId, ref: 'Ingredient' }])
  public ingredients: Ingredient[];
}
