import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NotesDocument = HydratedDocument<Notes>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class Notes {
  @Prop()
  public uniqueId: string;
  @Prop({
    type: mongooseSchema.Types.ObjectId,
    required: true,
    ref: 'User',
  })
  public user: mongooseSchema.Types.ObjectId;

  @Prop({ required: true, ref: 'Recipe' })
  public recipe: mongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  public region: string;

  @Prop({ required: true })
  public steps: mongooseSchema.Types.Mixed;

  @Prop({ default: true })
  public isActive: boolean;
}

export const notesSchema = SchemaFactory.createForClass(Notes);
