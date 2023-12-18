import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { ReviewRequestsService } from './review-requests.service';
import { Request, Response } from 'express';
// import axios from 'axios';
import { StoreData } from 'src/store/store-data.entity';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';

@Controller('review-requests')
export class ReviewRequestsController {
  constructor(
    private readonly reviewRequestsService: ReviewRequestsService,
    @InjectModel(StoreData)
    private readonly storeModel: typeof StoreData,
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
      return res.send('Missing code or shop parameter');
      
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

      await this.storeModel.create(
        {
          storeName,
          email: 'amitgodara1008@gmail.com',
          accessToken: access_token,
          isAppInstall: true,
        },
      );

      await this.reviewRequestsService.registerWebhook(shop, access_token);

      // res.send("Successfully connected to Shopify!");
      return res.redirect(`https://admin.shopify.com/store/test-review-ap/apps/testing-mate`);
    } catch (error) {
      console.log(error);
      return res.send('Error while OAuth process');
    }
  }

  @Post('/webhook/order-create')
  async orderFullfilledWebhook(
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      // Verify the request is from Shopify
      // Implement request verification logic here
      // Parse the incoming webhook payload
      const webhookData = req.body;
      console.log("WEBHOOK RECEIVED", req.route.path);
  
      // Handle the specific event based on the 'topic' in the payload
      switch (req.route.path) {
        case "/review-requests/webhook/order-create":
          const fulfilledData = {
            customerName: `${webhookData.customer.first_name} ${webhookData.customer.last_name}`,
            customerEmail: webhookData.customer.email,
            orderNumber: webhookData.order_number.toString(),
            productId: webhookData.line_items[0].product_id.toString(),
            productName: webhookData.line_items[0].title,
          };
          console.log(fulfilledData);
          break;
        // Add more cases for other webhook topics if needed
      }
  
      // Respond to the webhook request
      res.status(200).send("Webhook received successfully");
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
}
