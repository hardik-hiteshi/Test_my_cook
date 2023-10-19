import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AdvertisementDocument } from '../schemas/advertisement.schema';
import { AdvertisementService } from '../advertisement.service';
import { AUTH } from '../../auth/decorator/auth.decorator';
import { PaginationDTO } from '../dto/pagination.dto';
import { Role } from '../../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller('Advertisements')
export class AdvertisementsController {
  public constructor(public adverstimentServices: AdvertisementService) {}
  @Post()
  public async getByQuery(
    @Headers('region') region: string,
    @Body() body: PaginationDTO,
  ): Promise<AdvertisementDocument[] | number> {
    return await this.adverstimentServices.getbyQuery(region, body);
  }
}
