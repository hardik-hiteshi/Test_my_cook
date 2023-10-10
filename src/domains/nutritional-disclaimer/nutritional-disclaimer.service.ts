import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNutritionalDisclaimerDTO } from './dto/createNutritionalDisclaimer/createNutritionalDisclaimer.dto';
import { NutritionalDisclaimerDocument } from './schema/nutritionalDisclaimer.schema';
import { NutritionalDisclaimerRepository } from './repository/nutritionalDisclaimer.repository';
import { UpdateNutritionalDisclaimerDTO } from './dto/updateNutritionalDisclaimer/updateNutritionalDisclaimer.dto';

@Injectable()
export class NutritionalDisclaimerService {
  public constructor(public ndRepo: NutritionalDisclaimerRepository) {}

  public async createNutritionalDisclaimer(
    region: string,
    body: CreateNutritionalDisclaimerDTO,
  ): Promise<NutritionalDisclaimerDocument> {
    const ndDoc = await this.ndRepo.findOne(region, body);
    if (!ndDoc) {
      const ndDoc = await this.ndRepo.create(region, body);

      return ndDoc;
    }
    throw new BadRequestException('Nutritional Disclaimer already exists.');
  }

  public async fetchNutritionalDisclaimer(
    region: string,
  ): Promise<NutritionalDisclaimerDocument> {
    const ndDoc = await this.ndRepo.fetchND(region);
    if (ndDoc) {
      return ndDoc;
    }
    throw new NotFoundException('NutritionalDisclaimer not found.');
  }

  public async fetchAllNutritionalDisclaimer(
    region: string,
  ): Promise<NutritionalDisclaimerDocument[]> {
    const ndDocList = await this.ndRepo.fetchAllND(region);
    if (ndDocList.length > 0) {
      return ndDocList;
    }
    // throw new NotFoundException(
    //   'No Document found in Nutritional Disclaimer List.',
    // );

    return [];
  }

  public async upsertNutritionalDisclaimer(
    region: string,
    body: UpdateNutritionalDisclaimerDTO,
  ): Promise<NutritionalDisclaimerDocument> {
    const updatedNDdoc = await this.ndRepo.upsertND(region, body);
    if (!updatedNDdoc) {
      throw new NotFoundException(
        'Nutritional Disclaimer to update not found.',
      );
    }

    return updatedNDdoc;
  }

  public async deleteNutritionalDisclaimer(region: string): Promise<object> {
    const deletedNDdoc = await this.ndRepo.deleteND(region);
    if (!deletedNDdoc) {
      throw new NotFoundException(
        'Nutritional Disclaimer to update not found.',
      );
    }

    return { message: 'Deleted Success' };
  }
}
