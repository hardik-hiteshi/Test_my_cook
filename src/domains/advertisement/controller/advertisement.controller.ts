import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AdvertisementDocument } from '../schemas/advertisement.schema';
import { AdvertisementService } from '../advertisement.service';
import { AUTH } from '../../auth/decorator/auth.decorator';
import { CreateAdvertisementDTO } from '../dto/createadvertisement.dto';
import { Role } from 'src/domains/auth/roles/permission.roles';
import { UpdateAdvertisementDTO } from '../dto/updateadvertisement.dto';

@AUTH(Role.admin)
@Controller()
export class AdvertisementController {
  public constructor(public adverstimentServices: AdvertisementService) {}

  @Get('Advertisement/:niceName')
  public async fetchAdvertisement(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<AdvertisementDocument> {
    return await this.adverstimentServices.fetchAdvertisement(region, niceName);
  }

  @Post('Advertisement')
  public async createAdvertisement(
    @Headers('region') region: string,
    @Body() body: CreateAdvertisementDTO,
  ): Promise<AdvertisementDocument> {
    return await this.adverstimentServices.createAdvertisement(region, body);
  }

  @Put('Advertisement/:niceName')
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

  @Delete('Advertisement/:niceName')
  public async deleteAdvertisement(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<object> {
    return await this.adverstimentServices.deleteAdvertisement(
      region,
      niceName,
    );
  }

  @Get('Advertisements')
  public async fetchAdvertisements(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<AdvertisementDocument[]> {
    return await this.adverstimentServices.fetchAdvertisements(
      region,
      pageNumber,
      pageSize,
      search,
    );
  }

  @Get('Advertisement/cat/:category')
  public async fetchrandomAdvertisement(
    @Headers('region') region: string,
    @Param('category') category: string,
  ): Promise<AdvertisementDocument> {
    return await this.adverstimentServices.fetchrandomAdvertisement(
      region,
      category,
    );
  }

  @Put('Advertisement/click/:niceName')
  public async addClick(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<AdvertisementDocument> {
    return await this.adverstimentServices.addClick(region, niceName);
  }
}
