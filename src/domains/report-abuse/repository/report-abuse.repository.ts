import { CreateReportDto, UpdateReportDto } from '../dtos';
import {
  ReportAbuse,
  ReportAbuseDocument,
} from '../schema/report-abuse.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReportAbuseRepository {
  public constructor(
    @InjectModel(ReportAbuse.name) private reportModel: Model<ReportAbuse>,
  ) {}

  public async findOne(
    region: string,
    reportedUserNiceName: string,
  ): Promise<ReportAbuseDocument[]> {
    return await this.reportModel.find({ region, reportedUserNiceName });
  }

  public async findAll(region: string): Promise<ReportAbuseDocument[]> {
    return await this.reportModel.find({ region });
  }

  public async createOne(
    body: CreateReportDto,
    region: string,
  ): Promise<ReportAbuseDocument> {
    return await this.reportModel.create({ ...body, region });
  }

  public async deleteOne(
    region: string,
    reportedUserNiceName: string,
  ): Promise<ReportAbuseDocument> {
    return await this.reportModel.findOneAndDelete({
      region,
      reportedUserNiceName,
    });
  }

  public async updateOne(
    region: string,
    reportedUserNiceName: string,
    body: UpdateReportDto,
  ): Promise<ReportAbuseDocument> {
    return await this.reportModel.findOneAndUpdate(
      { region, reportedUserNiceName },
      body,
      { new: true },
    );
  }

  public async createManyReports(
    body: CreateReportDto[],
  ): Promise<ReportAbuseDocument[]> {
    return (await this.reportModel.insertMany(body)) as ReportAbuseDocument[];
  }
}
