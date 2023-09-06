import {
  LegalHistory,
  legalhistorySchema,
} from '../legal-history/schema/legal-history.schema';
import { LegalTerms, legalTermsSchema } from './schema/legal-terms.schema';
import { LegalTermsController } from './legal-terms.controller';
import { LegalTermsRepository } from './repository/legal-terms.repository';
import { LegalTermsService } from './legal-terms.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LegalTerms.name,
        schema: legalTermsSchema,
      },
    ]),
    MongooseModule.forFeature([
      { name: LegalHistory.name, schema: legalhistorySchema },
    ]),
  ],
  controllers: [LegalTermsController],
  providers: [LegalTermsService, LegalTermsRepository],
})
export class LegalTermsModule {}
