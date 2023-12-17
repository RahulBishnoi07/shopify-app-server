import { Injectable } from '@nestjs/common';
import { UpdateReviewRequestDto } from './dto/update-review-request.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ReviewRequest } from './entities/review-request.entity';

@Injectable()
export class ReviewRequestsService {
  constructor(
    @InjectModel(ReviewRequest)
    private readonly reviewRequestModel: typeof ReviewRequest,
  ) {}
  async update(payload = {}, condition = {}) {
    return this.reviewRequestModel.update(payload, {where: condition});
  }

  async findOne(payload = {}) {
    return this.reviewRequestModel.findOne({ where: payload });
  }
}
