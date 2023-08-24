import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
// import { TranslationsDTO } from './subdto/badge.translations.dto';
// import { Type } from 'class-transformer';

export class CreateBadgesDTO {
  @IsOptional()
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public niceName: string;

  @IsOptional()
  @IsNumber()
  public index: number;

  @IsOptional()
  @IsString()
  public image: string;

  @IsNotEmpty()
  @IsString()
  public range: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsOptional()
  @IsString()
  public prizeTxt: string;
  @IsOptional()
  @IsString()
  public prize: string;

  @IsOptional()
  @IsString()
  public terms: string;

  @IsOptional()
  @IsString()
  public region: string;
  //will work on this later.
  //   @IsOptional()
  //   @ValidateNested()
  //   @Type(() => TranslationsDTO)
  //   public translations: TranslationsDTO;
}
