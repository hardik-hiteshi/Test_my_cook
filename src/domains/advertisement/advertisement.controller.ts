import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AdvertisementDocument } from './schemas/advertisement.schema';
import { AdvertisementService } from './advertisement.service';
import { CreateAdvertisementDTO } from './dto/createadvertisement.dto';
import { UpdateAdvertisementDTO } from './dto/updateadvertisement.dto';

@Controller('Advertisement')
export class AdvertisementController {
  public constructor(public adverstimentServices: AdvertisementService) {}
  @Get(':niceName')
  public async fetchAdvertisement(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<AdvertisementDocument> {
    return await this.adverstimentServices.fetchAdvertisement(region, niceName);
  }
  @Post('')
  public async createAdvertisement(
    @Headers('region') region: string,
    @Body() body: CreateAdvertisementDTO,
  ): Promise<AdvertisementDocument> {
    return await this.adverstimentServices.createAdvertisement(region, body);
  }
  @Patch(':niceName')
  public async updateAdvertisement(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
    @Body() body: UpdateAdvertisementDTO,
  ): Promise<AdvertisementDocument> {
    return await this.adverstimentServices.updateAdvertisement(
      region,
      niceName,
      body,
    );
  }
  @Delete(':niceName')
  public async deleteAdvertisement(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<AdvertisementDocument> {
    return await this.adverstimentServices.deleteAdvertisement(
      region,
      niceName,
    );
  }
  @Get('fetchall')
  public async fetchAdvertisements(
    @Headers('region') region: string,
    @Query('search') search: string,
  ): Promise<AdvertisementDocument[]> {
    return await this.adverstimentServices.fetchAdvertisements(region, search);
  }
}
