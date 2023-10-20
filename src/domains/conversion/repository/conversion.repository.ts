import { Conversion, ConversionDocument } from '../schema/conversion.schema';
import { ConversionQueryInterface } from './conversion.query.interface';
import { CreateConversionDTO } from '../dto/createDto/create.conversion.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateConversionDTO } from '../dto/updateDto/update.conversion.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ConversionRepository {
  public constructor(
    @InjectModel(Conversion.name)
    public conversionModel: Model<ConversionDocument>,
  ) {}

  public async createConversion(
    body: CreateConversionDTO,
  ): Promise<ConversionDocument> {
    const conversion = await this.conversionModel.create({
      ...body,
      uniqueId: uuid(),
    });

    // const conversionData = await this.conversionModel.findOne({
    //   uniqueId: conversion.uniqueId,
    // });
    //.populate('conversion', 'affiliate order');

    return conversion;
  }

  public async fetchOne(uniqueId: string): Promise<ConversionDocument> {
    const conversion = await this.conversionModel.findOne({
      uniqueId,
      isActive: true,
    });
    //.populate('conversion', 'niceName');

    return conversion;
  }

  public async updateConversion(
    uniqueId: string,
    body: UpdateConversionDTO,
  ): Promise<ConversionDocument> {
    const updatedConversion = await this.conversionModel.findOneAndUpdate(
      { uniqueId, isActive: true },
      body,
      { new: true },
    );
    //.populate('conversion', 'niceName');

    return updatedConversion;
  }

  public async deleteConversion(uniqueId: string): Promise<ConversionDocument> {
    const deletedConversion = await this.conversionModel.findOneAndUpdate(
      { uniqueId, isActive: true },
      { isActive: false },
      { new: true },
    );

    return deletedConversion;
  }

  public async fetchConversions(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<ConversionDocument[]> {
    const query: ConversionQueryInterface = {
      isActive: true,
    };
    const skipAmount = (pageNumber - 1) * pageSize;
    if (search) {
      query.$or = [{ uniqueId: { $regex: search.toString(), $options: 'i' } }];
    }

    const conversions = await this.conversionModel
      .find({
        $and: [query, { isActive: true }],
      })
      .skip(skipAmount)
      .limit(pageSize);
    //.populate('conversion', 'niceName');

    return conversions;
  }

  // public async findOne(
  //   body: CreateConversionDTO,
  // ): Promise<ConversionDocument> {
  //   const existingConversion = await this.conversionModel.findOne({
  //     uniqueId: body.uniqueId,
  //     isActive: true,
  //   });

  //   return existingConversion;
  // }
}
