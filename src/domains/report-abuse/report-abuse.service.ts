import { CreateReportDto, UpdateReportDto } from './dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManyReportsDto } from './dtos/createManyReports/createManyReports.dto';
import { ReportAbuseDocument } from './schema/report-abuse.schema';
import { ReportAbuseRepository } from './repository/report-abuse.repository';

@Injectable()
export class ReportAbuseService {
  public reportNotFound = 'report not found';
  public constructor(private reportRepo: ReportAbuseRepository) {}
  public async createOne(
    body: CreateReportDto,
    region: string,
  ): Promise<ReportAbuseDocument> {
    return await this.reportRepo.createOne(body, region);
  }

  public async updateOne(
    region: string,
    reportedUserNiceName: string,
    body: UpdateReportDto,
  ): Promise<ReportAbuseDocument> {
    const report = await this.reportRepo.updateOne(
      region,
      reportedUserNiceName,
      body,
    );

    if (!report) throw new NotFoundException(this.reportNotFound);

    return report;
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<ReportAbuseDocument[]> {
    const reports = await this.reportRepo.findAll(region, pageNumber, pageSize);
    if (reports.length > 0) {
      return reports;
    }
    // throw new NotFoundException(this.reportNotFound);

    return [];
  }

  public async deleteOne(
    region: string,
    reportedUserNiceName,
  ): Promise<object> {
    const report = await this.reportRepo.deleteOne(
      region,
      reportedUserNiceName,
    );
    if (!report) throw new NotFoundException(this.reportNotFound);

    return { message: 'Deleted Success' };
  }

  public async findOne(
    region: string,
    reportedUserNiceName: string,
  ): Promise<ReportAbuseDocument> {
    const reports = await this.reportRepo.findOne(region, reportedUserNiceName);
    if (reports) {
      return reports;
    }
    throw new NotFoundException(this.reportNotFound);
  }

  public async createManyReports(
    region: string,
    body: CreateManyReportsDto,
  ): Promise<ReportAbuseDocument[]> {
    for (let i = 0; i < body.data.length; i++) {
      body.data[i]['region'] = region;
    }

    return await this.reportRepo.createManyReports(body.data);
  }
}
