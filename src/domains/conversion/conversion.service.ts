import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConversionDocument } from './schema/conversion.schema';
import { ConversionRepository } from './repository/conversion.repository';
import { CreateConversionDTO } from './dto/createDto/create.conversion.dto';
import { UpdateConversionDTO } from './dto/updateDto/update.conversion.dto';

@Injectable()
export class ConversionService {
  public constructor(public conversionsRepo: ConversionRepository) {}

  public async createConversion(
    body: CreateConversionDTO,
  ): Promise<ConversionDocument> {
    const conversions = await this.conversionsRepo.createConversion(body);

    return conversions;
  }

  public async fetchConversion(uniqueId: string): Promise<ConversionDocument> {
    const conversions = await this.conversionsRepo.fetchOne(uniqueId);
    if (!conversions) {
      throw new NotFoundException('Conversion not found.');
    }

    return conversions;
  }

  public async updateConversion(
    uniqueId: string,
    body: UpdateConversionDTO,
  ): Promise<ConversionDocument> {
    let updatedConversion: ConversionDocument;
    try {
      updatedConversion = await this.conversionsRepo.updateConversion(
        uniqueId,
        body,
      );
    } catch (e) {
      if (e.code === 11000 || e.code === 11001) {
        throw new BadRequestException(e.message);
      } else {
        throw e;
      }
    }
    if (!updatedConversion) {
      throw new NotFoundException('conversion Not found.');
    }

    return updatedConversion;
  }

  public async deleteConversion(uniqueId: string): Promise<object> {
    const deletedConversion = await this.conversionsRepo.deleteConversion(
      uniqueId,
    );

    if (!deletedConversion) {
      throw new NotFoundException('conversion Not found.');
    }

    return { message: 'Deleted Success' };
  }

  public async fetchConversions(
    search?: string,
  ): Promise<ConversionDocument[]> {
    const conversionssList = await this.conversionsRepo.fetchConversions(
      search,
    );
    if (conversionssList.length > 0) {
      return conversionssList;
    }

    return [];
    // throw new NotFoundException('Conversions not found.');
  }
}
