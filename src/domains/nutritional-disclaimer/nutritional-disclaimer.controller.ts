import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateNutritionalDisclaimerDTO } from './dto/createNutritionalDisclaimer/createNutritionalDisclaimer.dto';
import { NutritionalDisclaimerDocument } from './schema/nutritionalDisclaimer.schema';
import { NutritionalDisclaimerService } from './nutritional-disclaimer.service';
import { UpdateNutritionalDisclaimerDTO } from './dto/updateNutritionalDisclaimer/updateNutritionalDisclaimer.dto';

@Controller()
export class NutritionalDisclaimerController {
  public constructor(public ndservice: NutritionalDisclaimerService) {}

  @Post('NutritionalDisclaimer')
  public async createNutritionalDisclaimer(
    @Headers('region') region: string,
    @Body() body: CreateNutritionalDisclaimerDTO,
  ): Promise<NutritionalDisclaimerDocument> {
    return await this.ndservice.createNutritionalDisclaimer(region, body);
  }

  @Get('NutritionalDisclaimer/:niceName')
  public async fetchNutritionalDisclaimer(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<NutritionalDisclaimerDocument> {
    return await this.ndservice.fetchNutritionalDisclaimer(region, niceName);
  }

  @Get('NutritionalDisclaimers')
  public async fetchAllNutritionalDisclaimer(
    @Headers('region') region: string,
  ): Promise<NutritionalDisclaimerDocument[]> {
    return await this.ndservice.fetchAllNutritionalDisclaimer(region);
  }

  @Put('NutritionalDisclaimer/:niceName')
  public async updateNutritionalDisclaimer(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
    @Body() body: UpdateNutritionalDisclaimerDTO,
  ): Promise<NutritionalDisclaimerDocument> {
    return await this.ndservice.updateNutritionalDisclaimer(
      region,
      niceName,
      body,
    );
  }

  @Delete('NutritionalDisclaimer/:niceName')
  public async deleteNutritionalDisclaimer(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<NutritionalDisclaimerDocument> {
    return await this.ndservice.deleteNutritionalDisclaimer(region, niceName);
  }
}
