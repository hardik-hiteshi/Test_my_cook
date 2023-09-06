import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMachineLogDto {
  @IsOptional()
  @IsString()
  public type: string;

  @IsOptional()
  @IsDateString()
  public date: Date;

  @IsOptional()
  @IsNumber()
  public t: number;

  @IsOptional()
  @IsString()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public T: string;

  @IsOptional()
  @IsString()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public S: string;

  @IsOptional()
  @IsNumber()
  public scale: number;

  @IsOptional()
  @IsString()
  public error: string;

  @IsOptional()
  @IsString()
  public serial: string;

  @IsOptional()
  @IsString()
  public wifiStatus: string;

  @IsOptional()
  @IsString()
  public wifiRssi: string;

  @IsOptional()
  @IsString()
  public wifiSignalStrength: string;
  @IsOptional()
  @IsString()
  public wifiLinkSpeed: string;

  @IsOptional()
  @IsNumber()
  public wifiBand: number;

  @IsOptional()
  @IsString()
  public wifiType: string;

  @IsOptional()
  @IsString()
  public wifiDbm: string;

  @IsOptional()
  @IsString()
  public wifiProtocol: string;

  @IsOptional()
  @IsString()
  public knobLayoutSelected: string;

  @IsOptional()
  @IsString()
  public themeSelected: string;

  @IsOptional()
  @IsString()
  public tabletBoot: string;
  @IsOptional()
  @IsString()
  public tabletTime: string;
  @IsOptional()
  @IsString()
  public loginIP: string;
  @IsOptional()
  @IsString()
  public loginRegion: string;
}
