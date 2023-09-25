import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateReportDto, UpdateReportDto } from './dtos';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateManyReportsDto } from './dtos/createManyReports/createManyReports.dto';
import { ReportAbuseDocument } from './schema/report-abuse.schema';
import { ReportAbuseService } from './report-abuse.service';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
export class ReportAbuseController {
  public constructor(private reportService: ReportAbuseService) {}

  @Post('reportAbuse')
  private async createReport(
    @Headers('region') region: string,
    @Body() body: CreateReportDto,
  ): Promise<ReportAbuseDocument> {
    return await this.reportService.createOne(body, region);
  }

  @Get('reportAbuse/:reportedUserNiceName')
  private async getOne(
    @Headers('region') region: string,
    @Param('reportedUserNiceName') reportedUserNiceName: string,
  ): Promise<ReportAbuseDocument[]> {
    return await this.reportService.findOne(region, reportedUserNiceName);
  }

  @Get('reportAbuses')
  private async getAll(
    @Headers('region') region: string,
  ): Promise<ReportAbuseDocument[]> {
    return await this.reportService.findAll(region);
  }

  @Put('reportAbuse/:reportedUserNiceName')
  private async updateOne(
    @Headers('region') region: string,
    @Param('reportedUserNiceName') reportedUserNiceName: string,
    @Body() body: UpdateReportDto,
  ): Promise<ReportAbuseDocument> {
    return await this.reportService.updateOne(
      region,
      reportedUserNiceName,
      body,
    );
  }

  // using hard delete for now
  @Delete('reportAbuse/:reportedUserNiceName')
  private async deleteOne(
    @Headers('region') region: string,
    @Param('reportedUserNiceName') reportedUserNiceName: string,
  ): Promise<void> {
    await this.reportService.deleteOne(region, reportedUserNiceName);
  }

  @Post('reportAbuses')
  private async createManyReports(
    @Headers('region') region: string,
    @Body() body: CreateManyReportsDto,
  ): Promise<ReportAbuseDocument[]> {
    return await this.reportService.createManyReports(region, body);
  }
}
