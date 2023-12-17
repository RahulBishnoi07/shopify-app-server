import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewRequestsService } from './review-requests.service';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { UpdateReviewRequestDto } from './dto/update-review-request.dto';

@Controller('review-requests')
export class ReviewRequestsController {
  constructor(private readonly reviewRequestsService: ReviewRequestsService) {}

  @Post()
  create(@Body() createReviewRequestDto: CreateReviewRequestDto) {
    return this.reviewRequestsService.create(createReviewRequestDto);
  }

  @Get()
  findAll() {
    return this.reviewRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewRequestDto: UpdateReviewRequestDto) {
    return this.reviewRequestsService.update(+id, updateReviewRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewRequestsService.remove(+id);
  }
}
