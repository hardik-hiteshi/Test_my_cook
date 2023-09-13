import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommonService {
  public constructor(private configService: ConfigService) {}
  public fileUpload(file: Array<Express.Multer.File>, type: string): object[] {
    if (!file || file.length <= 0)
      throw new BadRequestException('request must contain file');
    const baseUrl = this.configService.get('BASE_URL');
    const result = file.map((data, index) => ({
      [index]: `${baseUrl}/image/${type}/${data.filename}`,
    }));

    return result;
  }
}
