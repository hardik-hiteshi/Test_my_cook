import { Schema, Prop } from '@nestjs/mongoose';
import { Schema as mongooseSchema } from 'mongoose';
import { Ingredient } from './ingredients.subschema';

@Schema({ _id: false })
export class Steps {}
