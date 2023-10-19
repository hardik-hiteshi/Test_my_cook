import { Global, Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './services/common.service';
import { GeoLocationModule } from 'src/domains/geoLocation/geoLocation.module';
import { HelperService } from './services/helper.service';
import { TransactionService } from './services/transaction.service';
import { UserLogModule } from 'src/domains/user-log/user-log.module';

@Global()
@Module({
  providers: [HelperService, CommonService, TransactionService],
  exports: [HelperService, TransactionService, CommonService],
  controllers: [CommonController],
  imports: [GeoLocationModule, UserLogModule],
})
export class CommonModule {}
