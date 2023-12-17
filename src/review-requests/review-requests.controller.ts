import { Controller, Get, Query, Res } from '@nestjs/common';
import { ReviewRequestsService } from './review-requests.service';
import { Response } from 'express';

@Controller('review-requests')
export class ReviewRequestsController {
  constructor(private readonly reviewRequestsService: ReviewRequestsService) {}

  @Get('/update')
  async updateReviewRequest(
    @Query('reviewId') id: string,
    @Query('rating') ratingStar: string,
    @Query('review') ratingMessage?: string,
    @Res() res?: Response,
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
      return res.redirect('http://localhost:3000/thankyou');
    } catch (error) {
      throw error;
    }
  }
}
