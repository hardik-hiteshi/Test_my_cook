import { CreateTipDto, UpdateTipDto } from './dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TipDocument } from './schema/tip.schema';
import { TipRepository } from './repository/tip.repository';

@Injectable()
export class TipService {
  public constructor(private tipRepo: TipRepository) {}

  public async findOne(uniqueId: string): Promise<TipDocument> {
    const tip = await this.tipRepo.findOne(uniqueId);
    if (!tip) throw new NotFoundException('tip not found');

    return tip;
  }

  public async findAll(
    region,
    pageNumber: number,
    pageSize: number,
    search?,
  ): Promise<TipDocument[]> {
    const tip = await this.tipRepo.findAll(
      region,
      pageNumber,
      pageSize,
      search,
    );

    if (tip.length > 0) {
      return tip;
    }
    // throw new NotFoundException('tip not found');

    return [];
  }

  public async createOne(
    body: CreateTipDto,
    region: string,
  ): Promise<TipDocument> {
    return await this.tipRepo.createOne(body, region);
  }

  public async deleteOne(uniqueId: string): Promise<object> {
    const tip = await this.tipRepo.deleteOne(uniqueId);
    if (!tip) throw new NotFoundException('tip not found');

    return { message: 'Deleted Success' };
  }

  public async updateOne(
    uniqueId: string,
    body: UpdateTipDto,
  ): Promise<TipDocument> {
    const tip = await this.tipRepo.updateOne(uniqueId, body);
    if (!tip) throw new NotFoundException('tip not found');

    return tip;
  }

  public async findRandomTip(region: string): Promise<TipDocument> {
    const max = await this.tipRepo.getTipCount(region);

    if (!max) throw new NotFoundException('tip not found');

    const tip = await this.tipRepo.findRandomTip(region, max);

    if (!tip) throw new NotFoundException('tip not found');

    return tip;
  }
}
