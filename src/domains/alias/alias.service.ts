import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAliasDto, UpdateAliasDto } from './dtos';
import { AliasDocument } from './schema/alias.schema';
import { AliasRepository } from './repository/alias.repository';

@Injectable()
export class AliasService {
  public aliasNotFound = ' alias not found';
  public aliasAlreadyexist = ' alias already exist';
  public constructor(private aliasRepo: AliasRepository) {}

  public async findOne(niceName: string): Promise<AliasDocument> {
    const alias = await this.aliasRepo.findOne(niceName);
    if (!alias) throw new NotFoundException(this.aliasNotFound);

    return alias;
  }

  public async findAll(): Promise<AliasDocument[]> {
    const alias = await this.aliasRepo.findAll();
    if (alias.length <= 0) throw new NotFoundException(this.aliasNotFound);

    return alias;
  }
  public async createOne(body: CreateAliasDto): Promise<AliasDocument> {
    const alias = await this.aliasRepo.findOne(body.niceName);
    if (alias) throw new BadRequestException(this.aliasAlreadyexist);

    return await this.aliasRepo.createOne(body);
  }

  public async updateOne(
    niceName: string,
    body: UpdateAliasDto,
  ): Promise<AliasDocument> {
    const alias = await this.aliasRepo.updateOne(niceName, body);
    if (!alias) throw new NotFoundException(this.aliasNotFound);

    return alias;
  }

  public async deleteOne(niceName: string): Promise<void> {
    const alias = await this.aliasRepo.deleteOne(niceName);
    if (!alias) throw new NotFoundException(this.aliasNotFound);
  }
}
