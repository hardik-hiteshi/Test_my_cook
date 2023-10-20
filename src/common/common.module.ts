import { Global, Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './services/common.service';
import { HelperService } from './services/helper.service';
import { TransactionService } from './services/transaction.service';

@Global()
@Module({
  providers: [HelperService, CommonService, TransactionService],
  exports: [HelperService, TransactionService],
  controllers: [CommonController],
})
export class CommonModule {}
