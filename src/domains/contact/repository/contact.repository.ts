import { Contact, ContactDocument } from '../schema/contact.schema';
import { CreateContactDto, UpdateContactDto } from '../dtos';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ContactRepository {
  public constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
  ) {}

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<ContactDocument> {
    return await this.contactModel.findOne({
      niceName,
      region,
      isActive: true,
    });
  }
  public async findAll(region: string): Promise<ContactDocument[]> {
    return await this.contactModel.find({ region, isActive: true });
  }
  public async createOne(
    region: string,
    body: CreateContactDto,
  ): Promise<ContactDocument> {
    return await this.contactModel.create({ ...body, region });
  }
  public async updateOne(
    niceName: string,
    region: string,
    body: UpdateContactDto,
  ): Promise<ContactDocument> {
    return await this.contactModel.findOneAndUpdate(
      { region, niceName, isActive: true },
      body,
      { new: true },
    );
  }
  public async deleteOne(
    niceName: string,
    region: string,
  ): Promise<ContactDocument> {
    return await this.contactModel.findOneAndUpdate(
      { isActive: true, niceName, region },
      { isActive: false },
      { new: true },
    );
  }
}
