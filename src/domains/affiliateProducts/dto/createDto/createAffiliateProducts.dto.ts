// user.dto.ts
import { IsMongoId } from 'class-validator';
import { Schema as mongooseSchema } from 'mongoose';

export class CreateAffiliateProductDTO {
  @IsMongoId()
  public affiliateProduct: mongooseSchema.Types.ObjectId;
}
