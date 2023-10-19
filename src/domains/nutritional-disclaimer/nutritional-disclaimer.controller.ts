import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  Put,
} from '@nestjs/common';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateNutritionalDisclaimerDTO } from './dto/createNutritionalDisclaimer/createNutritionalDisclaimer.dto';
import { NutritionalDisclaimerDocument } from './schema/nutritionalDisclaimer.schema';
import { NutritionalDisclaimerService } from './nutritional-disclaimer.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdateNutritionalDisclaimerDTO } from './dto/updateNutritionalDisclaimer/updateNutritionalDisclaimer.dto';

@AUTH(Role.admin)
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

  @Get('NutritionalDisclaimer')
  public async fetchNutritionalDisclaimer(
    @Headers('region') region: string,
  ): Promise<NutritionalDisclaimerDocument> {
    return await this.ndservice.fetchNutritionalDisclaimer(region);
  }

  @Get('NutritionalDisclaimers')
  public async fetchAllNutritionalDisclaimer(
    @Headers('region') region: string,
  ): Promise<NutritionalDisclaimerDocument[]> {
    return await this.ndservice.fetchAllNutritionalDisclaimer(region);
  }

  @Put('NutritionalDisclaimer')
  public async upsertNutritionalDisclaimer(
    @Headers('region') region: string,
    @Body() body: UpdateNutritionalDisclaimerDTO,
  ): Promise<NutritionalDisclaimerDocument> {
    return await this.ndservice.upsertNutritionalDisclaimer(region, body);
  }

  @Delete('NutritionalDisclaimer')
  public async deleteNutritionalDisclaimer(
    @Headers('region') region: string,
  ): Promise<object> {
    return await this.ndservice.deleteNutritionalDisclaimer(region);
  }
}
