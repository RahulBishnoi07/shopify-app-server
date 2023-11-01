import { Module } from '@nestjs/common';
import { FlipkartService } from './flipkart.service';
import { FlipkartController } from './flipkart.controller';

@Module({
  controllers: [FlipkartController],
  providers: [FlipkartService],
})
export class FlipkartModule {}
