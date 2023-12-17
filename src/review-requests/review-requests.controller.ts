import { Controller, Post, Query } from '@nestjs/common';
import { ReviewRequestsService } from './review-requests.service';

@Controller('review-requests')
export class ReviewRequestsController {
  constructor(private readonly reviewRequestsService: ReviewRequestsService) {}

  @Post('/update')
  async updateReviewRequest(
    @Query('id') id: string,
    @Query('ratingStar') ratingStar: string,
    @Query('ratingMessage') ratingMessage?: string,
  ) {
    try {      
      const obj = await this.reviewRequestsService.findOne({ id });
      if (!obj) {
        throw new Error('Throw');
      }
      await this.reviewRequestsService.update(
        {
          isReviewed: true,
          isPublished: true,
          ratingStar: parseInt(ratingStar),
          ratingMessage,
        },
        { id: parseInt(id) },
      );
      return "Succesfully update";
    } catch (error) {
      throw error;
    }
  }
}
