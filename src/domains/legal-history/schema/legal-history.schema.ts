import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { LHcommunityConditions } from './subSchema/legal-history.community.subschema';
import { LHInfo } from './subSchema/legal-history.info.subschema';
import { LHinternationalConditions } from './subSchema/legal-history.internationalConditions.subschema';
import { LHLayer } from './subSchema/layer/legal-history.layer.subschema';
import regions from 'src/common/enum/region.enum';

export type LegalHistoryDocument = HydratedDocument<LegalHistory>;

@Schema({})
export class LegalHistory {
  @Prop()
  public uniqueId: string;
  @Prop({ required: true, enum: regions, readonly: true })
  public region: string;
  @Prop({ min: 0, default: 0, readonly: true })
  public version: number;
  @Prop({ readonly: true })
  public startDate: Date;
  @Prop({ readonly: true })
  public finishDate: Date;
  @Prop({ readonly: true })
  public type: string;
  @Prop(LHLayer)
  public memberConditions: LHLayer;
  @Prop(LHcommunityConditions)
  public communityConditions: LHcommunityConditions;
  @Prop(LHinternationalConditions)
  public internationalConditions: LHcommunityConditions;
  @Prop(LHLayer)
  public newsletterConditions: LHLayer;
  @Prop(LHLayer)
  public ebookConditions: LHLayer;
  @Prop(LHLayer)
  public contactConditions: LHLayer;
  @Prop(LHLayer)
  public ecommerceGuestConditions: LHLayer;
  @Prop(LHcommunityConditions)
  public termsOfSale: LHcommunityConditions;
  @Prop(LHLayer)
  public affiliateContactConditions: LHLayer;
  @Prop(LHInfo)
  public info: LHInfo;
}
export const legalhistorySchema = SchemaFactory.createForClass(LegalHistory);
