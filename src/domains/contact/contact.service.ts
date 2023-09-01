import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto, UpdateContactDto } from './dtos';
import { ContactDocument } from './schema/contact.schema';
import { ContactRepository } from './repository/contact.repository';

@Injectable()
export class ContactService {
  public contactNotFound = 'contact not found';
  public contactAlreadyExist = 'contact already exist';
  public constructor(private contactRepo: ContactRepository) {}

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<ContactDocument> {
    const contact = await this.contactRepo.findOne(niceName, region);
    if (!contact) throw new NotFoundException(this.contactNotFound);

    return contact;
  }
  public async findAll(region: string): Promise<ContactDocument[]> {
    const contacts = await this.contactRepo.findAll(region);
    if (contacts.length <= 0) throw new NotFoundException(this.contactNotFound);

    return contacts;
  }
  public async createOne(
    region: string,
    body: CreateContactDto,
  ): Promise<ContactDocument> {
    const contact = await this.contactRepo.findOne(body.niceName, region);

    if (contact) throw new BadRequestException(this.contactAlreadyExist);

    return await this.contactRepo.createOne(region, body);
  }
  public async updateOne(
    region: string,
    niceName: string,
    body: UpdateContactDto,
  ): Promise<ContactDocument> {
    const contact = await this.contactRepo.updateOne(niceName, region, body);
    if (!contact) throw new NotFoundException(this.contactNotFound);

    return contact;
  }

  public async deleteOne(niceName: string, region: string): Promise<void> {
    const contact = await this.contactRepo.deleteOne(niceName, region);
    if (!contact) throw new NotFoundException(this.contactNotFound);
  }
}
