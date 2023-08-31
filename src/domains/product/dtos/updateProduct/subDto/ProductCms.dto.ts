import { IsOptional, ValidateNested } from 'class-validator';
import { ProductSeoDto } from './productSeo.dto';
import { ProductUrlDto } from './productUrl.dto';
import { Type } from 'class-transformer';

export class ProductCmsDto {
  @ValidateNested()
  @Type(() => ProductUrlDto)
  public url: ProductUrlDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductSeoDto)
  public seo?: ProductSeoDto;
}
