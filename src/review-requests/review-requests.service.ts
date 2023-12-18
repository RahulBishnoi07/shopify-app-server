import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReviewRequest } from './entities/review-request.entity';

@Injectable()
export class ReviewRequestsService {
  constructor(
    @InjectModel(ReviewRequest)
    private readonly reviewRequestModel: typeof ReviewRequest,
  ) {}

  async create(payload = {}){
    return this.reviewRequestModel.create(payload);
  }
  
  async update(payload = {}, condition = {}) {
    return this.reviewRequestModel.update(payload, {where: condition});
  }

  async findOne(payload = {}) {
    return this.reviewRequestModel.findOne({ where: payload });
  }

  async registerWebhook(shop, accessToken) {
    const webhookEndpoint = `https://7331-2405-201-5011-217a-48d1-12a4-d20d-bb7a.ngrok-free.app/review-requests/webhook/order-create`;
  
    const webhookPayload = {
      webhook: {
        topic: "orders/create",
        address: webhookEndpoint,
        format: "json",
      },
    };
  
    const apiUrl = `https://${shop}/admin/api/2023-10/webhooks.json`;
  
    try {
      const response = await axios.post(apiUrl, webhookPayload, {
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        console.log("Webhook registered successfully", response);
      } else {
        console.error("Failed to register webhook:", response.data);
      }
    } catch (error) {
      console.error("Error registering webhook:", error.message);
    }
  }
}
