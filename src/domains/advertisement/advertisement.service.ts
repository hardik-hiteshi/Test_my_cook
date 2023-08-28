import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AdvertisementDocument } from './schemas/advertisement.schema';
import { AdvertisementRepository } from './repository/advertisement.repository';
import { CreateAdvertisementDTO } from './dto/createadvertisement.dto';
import { UpdateAdvertisementDTO } from './dto/updateadvertisement.dto';

@Injectable()
export class AdvertisementService {
  public constructor(public adRepo: AdvertisementRepository) {}

  public async createAdvertisement(
    region: string,
    body: CreateAdvertisementDTO,
  ): Promise<AdvertisementDocument> {
    const existingAdvertisement = await this.adRepo.findOne(region, body);
    if (!existingAdvertisement) {
      const advertisement = await this.adRepo.createAdvertisement(region, body);

      return advertisement;
    }
    throw new BadRequestException('Advertisement already exists.');
  }

  public async fetchAdvertisement(
    region: string,
    niceName: string,
  ): Promise<AdvertisementDocument> {
    const advertisement = await this.adRepo.fetchAdvertisement(
      region,
      niceName,
    );
    if (advertisement) {
      return advertisement;
    }
    throw new NotFoundException('Advertisement does not exist.');
  }

  public async updateAdvertisement(
    region: string,
    niceName: string,
    body: UpdateAdvertisementDTO,
  ): Promise<AdvertisementDocument> {
    const updatedAdvertisement = await this.adRepo.updateAdvertisement(
      region,
      niceName,
      body,
    );
    if (!updatedAdvertisement) {
      throw new NotFoundException('Advertisement to update not found.');
    }

    return updatedAdvertisement;
  }

  public async deleteAdvertisement(
    region: string,
    niceName: string,
  ): Promise<AdvertisementDocument> {
    const deletedAdvertisement = await this.adRepo.deleteAdvertisement(
      region,
      niceName,
    );
    if (!deletedAdvertisement) {
      throw new NotFoundException('No Advertisement found.');
    }

    return deletedAdvertisement;
  }
  public async fetchAdvertisements(
    region: string,
    search: string,
  ): Promise<AdvertisementDocument[]> {
    const advertisementList = await this.adRepo.fetchAdvertisements(
      region,
      search,
    );
    if (advertisementList.length > 0) {
      return advertisementList;
    }
    throw new NotFoundException('No Advertisements found.');
  }
}
