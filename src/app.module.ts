import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlipkartModule } from './flipkart/flipkart.module';

@Module({
  imports: [FlipkartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
