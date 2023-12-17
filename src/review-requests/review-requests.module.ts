import { Module } from '@nestjs/common';
import { ReviewRequestsService } from './review-requests.service';
import { ReviewRequestsController } from './review-requests.controller';

@Module({
  controllers: [ReviewRequestsController],
  providers: [ReviewRequestsService],
})
export class ReviewRequestsModule {}
