import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
// import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateEbookDTO } from './dtos/createEbook/createEbook.dto';
import { EbookDocument } from './schema/ebook.schema';
import { EbookService } from './ebook.service';
import { UpdateEbookDTO } from './dtos/updateEbook/updateEbook.dto';
// import { Role } from '../auth/roles/permission.roles';

//   @AUTH(Role.admin)
@Controller('ebook')
export class EbookController {
  public constructor(private ebookService: EbookService) {}

  @Post()
  private async createEbook(
    @Headers('region') region: string,
    @Body() body: CreateEbookDTO,
  ): Promise<EbookDocument> {
    return await this.ebookService.createOne(region, body);
  }

  @Patch(':nicename')
  private async updateEbook(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
    @Body() body: UpdateEbookDTO,
  ): Promise<EbookDocument> {
    return await this.ebookService.updateOne(region, niceName, body);
  }
  @Delete(':nicename')
  private async deleteEbook(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    await this.ebookService.deleteOne(niceName, region);
  }

  @Get(':nicename')
  private async getEbook(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<EbookDocument> {
    return await this.ebookService.findOne(niceName, region);
  }
  @Get()
  private async getAllEbook(
    @Headers('region') region: string,
  ): Promise<EbookDocument[]> {
    return await this.ebookService.findAll(region);
  }
}
