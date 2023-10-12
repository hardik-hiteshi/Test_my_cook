import {
  AffiliateContact,
  AffiliateContactDocument,
} from '../schema/affiliateContact.schema';
import { AffiliateContactQueryInterface } from './affiliateContact.query.interface';
import { CreateAffiliateContactDTO } from '../dto/createDto/createAffiliateContact.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateAffiliateContactDTO } from '../dto/updateDto/updateAffiliateContact.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AffiliateContactRepository {
  public constructor(
    @InjectModel(AffiliateContact.name)
    public affiliateContactModel: Model<AffiliateContactDocument>,
  ) {}

  public async createAffiliateContact(
    body: CreateAffiliateContactDTO,
  ): Promise<AffiliateContactDocument> {
    const affiliateContact = await this.affiliateContactModel.create({
      ...body,
      uniqueId: uuid(),
    });

    return affiliateContact;
  }

  public async fetchOne(uniqueId: string): Promise<AffiliateContactDocument> {
    const affiliateContact = await this.affiliateContactModel.findOne({
      uniqueId,
      isActive: true,
    });

    return affiliateContact;
  }

  public async updateAffiliateContact(
    uniqueId: string,
    body: UpdateAffiliateContactDTO,
  ): Promise<AffiliateContactDocument> {
    const updatedAffiliateContact =
      await this.affiliateContactModel.findOneAndUpdate(
        { uniqueId, isActive: true },
        body,
        { new: true },
      );

    return updatedAffiliateContact;
  }

  public async deleteAffiliateContact(
    uniqueId: string,
  ): Promise<AffiliateContactDocument> {
    const deletedAffiliateContact =
      await this.affiliateContactModel.findOneAndUpdate(
        { uniqueId, isActive: true },
        { isActive: false },
        { new: true },
      );

    return deletedAffiliateContact;
  }

  public async fetchAffiliateContacts(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<AffiliateContactDocument[]> {
    const query: AffiliateContactQueryInterface = {
      isActive: true,
    };
    const skipAmount = (pageNumber - 1) * pageSize;
    if (search) {
      query.$or = [
        { email: { $regex: search.toString(), $options: 'i' } },
        { topic: { $regex: search.toString(), $options: 'i' } },
        { name: { $regex: search.toString(), $options: 'i' } },
        { lastName: { $regex: search.toString(), $options: 'i' } },
        { city: { $regex: search.toString(), $options: 'i' } },
        { province: { $regex: search.toString(), $options: 'i' } },
        { fiscalAddress: { $regex: search.toString(), $options: 'i' } },
        { cp: { $regex: search.toString(), $options: 'i' } },
        { webSite: { $regex: search.toString(), $options: 'i' } },
        { phone: { $regex: search.toString(), $options: 'i' } },
        { message: { $regex: search.toString(), $options: 'i' } },
        { companyName: { $regex: search.toString(), $options: 'i' } },
        { cif: { $regex: search.toString(), $options: 'i' } },
        { instagram: { $regex: search.toString(), $options: 'i' } },
        { facebook: { $regex: search.toString(), $options: 'i' } },
        { twitter: { $regex: search.toString(), $options: 'i' } },
        { youtube: { $regex: search.toString(), $options: 'i' } },
        { status: { $regex: search.toString(), $options: 'i' } },
      ];
    }

    const affiliateContacts = await this.affiliateContactModel
      .find({
        $and: [query, { isActive: true }],
      })
      .skip(skipAmount)
      .limit(pageSize);

    return affiliateContacts;
  }

  // public async findOne(
  //   body: CreateAffiliateContactDTO,
  // ): Promise<AffiliateContactDocument> {
  //   const existingAffiliateContact = await this.affiliateContactModel.findOne({
  //     uniqueId: body.uniqueId,
  //     isActive: true,
  //   });

  //   return existingAffiliateContact;
  // }
}
