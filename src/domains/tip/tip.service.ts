import { CreateTipDto, UpdateTipDto } from './dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Schema } from 'mongoose';
import { TipDocument } from './schema/tip.schema';
import { TipRepository } from './repository/tip.repository';

@Injectable()
export class TipService {
  public constructor(private tipRepo: TipRepository) {}

  public async findOne(id: Schema.Types.ObjectId): Promise<TipDocument> {
    const tip = await this.tipRepo.findOne(id);
    if (!tip) throw new NotFoundException('tip not found');

    return tip;
  }

  public async findAll(region, search?): Promise<TipDocument[]> {
    const tip = await this.tipRepo.findAll(region, search);

    if (tip.length <= 0) throw new NotFoundException('tip not found');

    return tip;
  }

  public async createOne(
    body: CreateTipDto,
    region: string,
  ): Promise<TipDocument> {
    return await this.tipRepo.createOne(body, region);
  }

  public async deleteOne(id: Schema.Types.ObjectId): Promise<void> {
    const tip = await this.tipRepo.deleteOne(id);
    if (!tip) throw new NotFoundException('tip not found');
  }

  public async updateOne(
    id: Schema.Types.ObjectId,
    body: UpdateTipDto,
  ): Promise<TipDocument> {
    const tip = await this.tipRepo.updateOne(id, body);
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
