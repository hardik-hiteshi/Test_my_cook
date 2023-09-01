import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePictosDto, UpdatePictosDto } from './dtos';
import { PictosDocument } from './schema/pictos.schema';
import { PictosRepository } from './repository/pictos.repository';

@Injectable()
export class PictosService {
  public pictosAlreadyExist = 'pictos already exist';

  public pictosNotFound = 'pictos not found';
  public constructor(private pictosRepo: PictosRepository) {}

  public async createOne(
    body: CreatePictosDto,
    region: string,
  ): Promise<PictosDocument> {
    const pictos = await this.pictosRepo.findOne({
      region,
      niceName: body.niceName,
      isDeleted: false,
    });

    if (pictos) throw new BadRequestException(this.pictosAlreadyExist);

    return await this.pictosRepo.createOne(body, region);
  }

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<PictosDocument> {
    const pictos = await this.pictosRepo.findOne({
      niceName,
      region,
      isDeleted: false,
    });

    if (!pictos) throw new NotFoundException(this.pictosNotFound);

    return pictos;
  }

  public async findAll(region: string): Promise<PictosDocument[]> {
    const pictos = await this.pictosRepo.findAll(region);

    if (pictos.length <= 0) throw new NotFoundException(this.pictosNotFound);

    return pictos;
  }

  public async deleteOne(region: string, niceName: string): Promise<void> {
    const pictos = await this.pictosRepo.findOne({
      region,
      isDeleted: false,
      niceName,
    });

    if (!pictos) throw new NotFoundException(this.pictosNotFound);

    pictos.isDeleted = true;
    await pictos.save();
  }

  public async updateOne(
    niceName: string,
    body: UpdatePictosDto,
    region: string,
  ): Promise<PictosDocument> {
    const pictos = await this.pictosRepo.updateOne(niceName, body, region);
    if (!pictos) throw new NotFoundException(this.pictosNotFound);

    return pictos;
  }
}
