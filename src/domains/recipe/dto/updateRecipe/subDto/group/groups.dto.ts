import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { StepsDTO } from './steps.dto';
import { Type } from 'class-transformer';
export class GroupsDTO {
  @IsOptional()
  @IsString()
  public name?: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => StepsDTO)
  public steps?: StepsDTO[];
}
