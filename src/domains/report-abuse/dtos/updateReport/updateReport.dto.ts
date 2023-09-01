import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class UpdateReportDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['Yes', 'No'])
  public managerDone: string;

  @IsNotEmpty()
  @IsString()
  public managerComment: string;
}
