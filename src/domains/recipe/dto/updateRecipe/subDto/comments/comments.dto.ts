import {
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CommentReplyDTO } from './commentsreply.dto';
import { Type } from 'class-transformer';
export class CommentsDTO {
  @IsOptional()
  @IsDateString()
  public date: Date;
  @IsOptional()
  @IsString()
  public displayName: string;
  @IsOptional()
  @IsString()
  public niceName: string;
  @IsOptional()
  @IsString()
  public rank: string;
  @IsOptional()
  @IsString()
  public text: string;
  @IsOptional()
  @IsString()
  public haveImage: boolean;
  @IsOptional()
  @ValidateNested()
  @Type(() => CommentReplyDTO)
  public comments: CommentReplyDTO[];
}
