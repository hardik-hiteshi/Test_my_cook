import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEbookDTO } from './dtos/createEbook/createEbook.dto';
import { EbookDocument } from './schema/ebook.schema';
import { EbookRepository } from './repository/ebook.repository';
import { UpdateEbookDTO } from './dtos/updateEbook/updateEbook.dto';

@Injectable()
export class EbookService {
  public ebookNotFound = 'Ebook not found';
  public ebookAlreadyExist = 'Ebook already exist';
  public constructor(private ebookRepo: EbookRepository) {}

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<EbookDocument> {
    const ebook = await this.ebookRepo.findOne(niceName, region);
    if (!ebook) throw new NotFoundException(this.ebookNotFound);

    return ebook;
  }

  public async findAll(region: string): Promise<EbookDocument[]> {
    const ebooks = await this.ebookRepo.findAll(region);
    if (ebooks.length <= 0) throw new NotFoundException(this.ebookNotFound);

    return ebooks;
  }

  public async createOne(
    region: string,
    body: CreateEbookDTO,
  ): Promise<EbookDocument> {
    const ebook = await this.ebookRepo.findOne(body.niceName, region);

    if (ebook) throw new BadRequestException(this.ebookAlreadyExist);

    return await this.ebookRepo.createOne(region, body);
  }

  public async updateOne(
    region: string,
    niceName: string,
    body: UpdateEbookDTO,
  ): Promise<EbookDocument> {
    const ebook = await this.ebookRepo.updateOne(niceName, region, body);
    if (!ebook) throw new NotFoundException(this.ebookNotFound);

    return ebook;
  }

  public async deleteOne(niceName: string, region: string): Promise<void> {
    const ebook = await this.ebookRepo.deleteOne(niceName, region);
    if (!ebook) throw new NotFoundException(this.ebookNotFound);
  }
}
