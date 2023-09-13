import { Prop, Schema } from '@nestjs/mongoose';
import { Ingredient } from './ingredients.subschema';
import stepFunction from '../enums/stepfunction.enum';
import stepType from '../enums/steptype.enum';

// @Schema({ _id: false })
@Schema()
export class Steps {
  @Prop()
  public description: string;
  @Prop({ default: 'mycook', enum: stepType })
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
    enum: stepFunction,
  })
  public function: string;
  @Prop([String])
  public accessories: string[];
  @Prop([Ingredient])
  public ingredients: Ingredient[];

  @Prop({ default: false })
  public haveImage: boolean;
}
