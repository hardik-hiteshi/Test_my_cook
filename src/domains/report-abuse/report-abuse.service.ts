import { CreateReportDto, UpdateReportDto } from './dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  public async findAll(region: string): Promise<ReportAbuseDocument[]> {
    const reports = await this.reportRepo.findAll(region);
    if (reports.length <= 0) throw new NotFoundException(this.reportNotFound);

    return reports;
  }

  public async deleteOne(region: string, reportedUserNiceName): Promise<void> {
    const report = await this.reportRepo.deleteOne(
      region,
      reportedUserNiceName,
    );
    if (!report) throw new NotFoundException(this.reportNotFound);
  }

  public async findOne(
    region: string,
    reportedUserNiceName: string,
  ): Promise<ReportAbuseDocument[]> {
    const reports = await this.reportRepo.findOne(region, reportedUserNiceName);
    if (reports.length <= 0) throw new NotFoundException(this.reportNotFound);

    return reports;
  }
}
