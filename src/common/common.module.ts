import { Global, Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './services/common.service';
import { HelperService } from './services/helper.service';

@Global()
@Module({
  providers: [HelperService, CommonService],
  exports: [HelperService],
  controllers: [CommonController],
})
export class CommonModule {}
