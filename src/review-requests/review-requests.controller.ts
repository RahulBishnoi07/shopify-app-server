import { Controller, Get, Query, Res } from '@nestjs/common';
import { ReviewRequestsService } from './review-requests.service';
import { Response } from 'express';
import axios from 'axios';
import { Store } from 'src/store/store.entity';
import { InjectModel } from '@nestjs/sequelize';

@Controller('review-requests')
export class ReviewRequestsController {
  constructor(
    private readonly reviewRequestsService: ReviewRequestsService,
    @InjectModel(Store)
    private readonly storeModel: typeof Store,
  ) {}

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

  @Get('/oauth/callback')
  async authCallback(
    @Query('code') code: string,
    @Query('shop') shop: string,
    @Res({ passthrough: true }) res?: Response,
  ) {
    const apiKey = process.env.SHOPIFY_API_KEY;
    const apiSecret = process.env.SHOPIFY_API_PASSWORD;

    if (!code || !shop) {
      res.send('Missing code or shop parameter');
      return;
    }

    console.log('code', code, 'shop', shop);

    const accessTokenUrl = `https://${shop}/admin/oauth/access_token`;
    const accessParams = new URLSearchParams();
    accessParams.append('client_id', apiKey);
    accessParams.append('client_secret', apiSecret);
    accessParams.append('code', code);

    try {
      const response = await axios.post(
        accessTokenUrl,
        accessParams.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const { access_token } = response.data;
      const storeName = shop.split('.')[0];

      const storeData = await this.storeModel.findOne({
        where: {
          storeName,
        },
      });

      if (!storeData) {
        return res.send('Store not found');
      }

      await this.storeModel.update(
        {
          accessToken: access_token,
          isAppInstall: true,
        },
        {
          where: {
            storeName,
          },
        },
      );

      await this.reviewRequestsService.registerWebhook(shop, access_token);

      // res.send("Successfully connected to Shopify!");
      return res.redirect(`https://google.co.in`);
    } catch (error) {
      console.log(error);
      res.send('Error while OAuth process');
    }
  }
}
