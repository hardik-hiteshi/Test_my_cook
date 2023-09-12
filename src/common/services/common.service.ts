import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  public constructor(private configService: ConfigService) {}
  public fileUpload(file: Array<Express.Multer.File>, type: string): object[] {
    const baseUrl = this.configService.get('BASE_URL');

    const result = file.map((data, index) => ({
      [index]: `${baseUrl}/image/${type}/${data.filename}`,
    }));

    return result;
  }
}
