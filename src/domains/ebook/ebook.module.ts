import { Ebook, ebookSchema } from './schema/ebook.schema';
import { EbookController } from './ebook.controller';
import { EbookRepository } from './repository/ebook.repository';
import { EbookService } from './ebook.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ebook.name, schema: ebookSchema }]),
  ],
  controllers: [EbookController],
  providers: [EbookService, EbookRepository],
})
export class EbookModule {}
