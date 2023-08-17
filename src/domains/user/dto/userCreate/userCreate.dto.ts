import {
  IsString,
  IsNotEmpty,
  MinLength,
  ValidateNested,
  IsArray,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from 'src/domains/auth/roles/permission.roles';
import {
  NameDto,
  LocationDto,
  ContactnDto,
  HistoryDto,
  ProfileDto,
  InfoDto,
  StatusDto,
  ShopItemDto,
  RecipeDto,
  MemberConditionsDto,
  CommunityConditionsDto,
  OtherConditionsDto,
  TranslationsDto,
} from './subDto';
export class UserCreateDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => NameDto)
  name?: NameDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ContactnDto)
  contact?: ContactnDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => HistoryDto)
  history?: HistoryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileDto)
  profile?: ProfileDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => InfoDto)
  info?: InfoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => StatusDto)
  status?: StatusDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ShopItemDto)
  shopItem?: ShopItemDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RecipeDto)
  recipeList?: RecipeDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => MemberConditionsDto)
  memberConditions?: MemberConditionsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CommunityConditionsDto)
  communityConditions?: CommunityConditionsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => OtherConditionsDto)
  newsletterConditions?: OtherConditionsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => OtherConditionsDto)
  internationalConditions?: OtherConditionsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => OtherConditionsDto)
  termsOfSale?: OtherConditionsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => OtherConditionsDto)
  ebookConditions?: OtherConditionsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => OtherConditionsDto)
  contactConditions?: OtherConditionsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => TranslationsDto)
  translations?: TranslationsDto;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  niceName: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  login: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  image?: string[];

  @IsOptional()
  @IsString()
  @IsEnum(Role)
  role?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allowedRegions?: string[];

  @IsOptional()
  @IsString()
  rank?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  badges?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  favorites?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  todo?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  grants?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  following?: string[];
}
