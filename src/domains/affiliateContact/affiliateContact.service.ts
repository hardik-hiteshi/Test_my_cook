import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AffiliateContactDocument } from './schema/affiliateContact.schema';
import { AffiliateContactRepository } from './repository/affiliateContact.repository';
import { CreateAffiliateContactDTO } from './dto/createDto/createAffiliateContact.dto';
import { UpdateAffiliateContactDTO } from './dto/updateDto/updateAffiliateContact.dto';

@Injectable()
export class AffiliateContactService {
  public constructor(public affiliateContactRepo: AffiliateContactRepository) {}

  public async createAffiliateContact(
    body: CreateAffiliateContactDTO,
  ): Promise<AffiliateContactDocument> {
    const affiliateContact =
      await this.affiliateContactRepo.createAffiliateContact(body);

    return affiliateContact;
  }

  public async fetchAffiliateContact(
    uniqueId: string,
  ): Promise<AffiliateContactDocument> {
    const affiliateContact = await this.affiliateContactRepo.fetchOne(uniqueId);
    if (!affiliateContact) {
      throw new NotFoundException('Affiliate-Contact not found.');
    }

    return affiliateContact;
  }

  public async updateAffiliateContact(
    uniqueId: string,
    body: UpdateAffiliateContactDTO,
  ): Promise<AffiliateContactDocument> {
    let updatedAffiliateContact: AffiliateContactDocument;
    try {
      updatedAffiliateContact =
        await this.affiliateContactRepo.updateAffiliateContact(uniqueId, body);
    } catch (e) {
      if (e.code === 11000 || e.code === 11001) {
        throw new BadRequestException(e.message);
      } else {
        throw e;
      }
    }
    if (!updatedAffiliateContact) {
      throw new NotFoundException('Affiliate-Contact Not found.');
    }

    return updatedAffiliateContact;
  }

  public async deleteAffiliateContact(uniqueId: string): Promise<object> {
    const deletedAffiliateContact =
      await this.affiliateContactRepo.deleteAffiliateContact(uniqueId);

    if (!deletedAffiliateContact) {
      throw new NotFoundException('Affiliate-Contact Not found.');
    }

    return { message: 'Deleted Success' };
  }

  public async fetchAffiliateContacts(
    search?: string,
  ): Promise<AffiliateContactDocument[]> {
    const affiliateContactsList =
      await this.affiliateContactRepo.fetchAffiliateContacts(search);
    if (affiliateContactsList.length > 0) {
      return affiliateContactsList;
    }

    return [];
    // throw new NotFoundException('AffiliateContacts not found.');
  }
}
