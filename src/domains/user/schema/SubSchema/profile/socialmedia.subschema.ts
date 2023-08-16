import { Schema, Prop } from '@nestjs/mongoose';
@Schema({ _id: false })
export class SocialMedia {
    @Prop()
    instagram: String;
    @Prop()
    googleplus: String;
    @Prop()
    twitter: String;
    @Prop()
    web: String;
    @Prop()
    webName: String;

}