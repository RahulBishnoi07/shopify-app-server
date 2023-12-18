import { Module } from '@nestjs/common';
import { ReviewRequestsService } from './review-requests.service';
import { ReviewRequestsController } from './review-requests.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewRequest } from './entities/review-request.entity';
import { Store } from 'src/store/store.entity';

@Module({
  imports: [SequelizeModule.forFeature([ReviewRequest, Store])],
  controllers: [ReviewRequestsController],
  providers: [ReviewRequestsService],
})
export class ReviewRequestsModule {}
