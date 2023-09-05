import {
  LegalRegistry,
  legalRegistrySchema,
} from './schema/legal-registry.schema';
import { LegalRegistryController } from './legal-registry.controller';
import { LegalRegistryRepository } from './repository/legal-registry.repository';
import { LegalRegistryService } from './legal-registry.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LegalRegistry.name, schema: legalRegistrySchema },
    ]),
  ],
  controllers: [LegalRegistryController],
  providers: [LegalRegistryService, LegalRegistryRepository],
})
export class LegalRegistryModule {}
