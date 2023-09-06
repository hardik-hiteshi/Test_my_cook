import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateReportDto, UpdateReportDto } from './dtos';
import { AUTH } from '../auth/decorator/auth.decorator';
import { ReportAbuseDocument } from './schema/report-abuse.schema';
import { ReportAbuseService } from './report-abuse.service';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller('report-abuse')
export class ReportAbuseController {
  public constructor(private reportService: ReportAbuseService) {}
  @Post()
  private async createReport(
    @Headers('region') region: string,
    @Body() body: CreateReportDto,
  ): Promise<ReportAbuseDocument> {
    return await this.reportService.createOne(body, region);
  }

  @Get(':reportedUserNiceName')
  private async getOne(
    @Headers('region') region: string,
    @Param('reportedUserNiceName') reportedUserNiceName: string,
  ): Promise<ReportAbuseDocument[]> {
    return await this.reportService.findOne(region, reportedUserNiceName);
  }

  @Get()
  private async getAll(
    @Headers('region') region: string,
  ): Promise<ReportAbuseDocument[]> {
    return await this.reportService.findAll(region);
  }

  @Patch(':reportedUserNiceName')
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
  @Delete(':reportedUserNiceName')
  private async deleteOne(
    @Headers('region') region: string,
    @Param('reportedUserNiceName') reportedUserNiceName: string,
  ): Promise<void> {
    await this.reportService.deleteOne(region, reportedUserNiceName);
  }
}
