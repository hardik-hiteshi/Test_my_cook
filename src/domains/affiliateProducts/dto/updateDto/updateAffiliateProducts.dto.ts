import { CreateAffiliateProductDTO } from '../createDto/createAffiliateProducts.dto';
import { IsMongoId } from 'class-validator';
import { Schema as mongooseSchema } from 'mongoose';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAffiliateProductDTO extends PartialType(
  CreateAffiliateProductDTO,
) {
  @IsMongoId()
  public affiliateProduct: mongooseSchema.Types.ObjectId;
}
