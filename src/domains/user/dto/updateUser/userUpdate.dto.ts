import {
  CommunityConditionsDto,
  ContactnDto,
  HistoryDto,
  InfoDto,
  LocationDto,
  MemberConditionsDto,
  NameDto,
  OtherConditionsDto,
  ProfileDto,
  RecipeDto,
  ShopItemDto,
  StatusDto,
  TranslationsDto,
} from './subDto';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Role } from 'src/domains/auth/roles/permission.roles';
import { Type } from 'class-transformer';
export class UserUpdateDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => NameDto)
  public name?: NameDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  public location?: LocationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ContactnDto)
  public contact?: ContactnDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => HistoryDto)
  public history?: HistoryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileDto)
  public profile?: ProfileDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => InfoDto)
  public info?: InfoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => StatusDto)
  public status?: StatusDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ShopItemDto)
  public shopItem?: ShopItemDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RecipeDto)
  public recipeList?: RecipeDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => MemberConditionsDto)
  public memberConditions?: MemberConditionsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CommunityConditionsDto)
  public communityConditions?: CommunityConditionsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => OtherConditionsDto)
  public newsletterConditions?: OtherConditionsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => OtherConditionsDto)
  public internationalConditions?: OtherConditionsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => OtherConditionsDto)
  public termsOfSale?: OtherConditionsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => OtherConditionsDto)
  public ebookConditions?: OtherConditionsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => OtherConditionsDto)
  public contactConditions?: OtherConditionsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => TranslationsDto)
  public translations?: TranslationsDto;

  @IsOptional()
  @MinLength(8)
  @IsString()
  public password?: string;

  @IsOptional()
  @MinLength(3)
  @IsString()
  public login?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public image?: string[];

  @IsOptional()
  @IsString()
  @IsEnum(Role)
  public role?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public allowedRegions?: string[];

  @IsOptional()
  @IsString()
  public rank?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public badges?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public favorites?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public todo?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public grants?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public following?: string[];
}
