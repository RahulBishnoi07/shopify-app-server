import { Injectable } from '@nestjs/common';
import { CreateFlipkartDto } from './dto/create-flipkart.dto';
import { UpdateFlipkartDto } from './dto/update-flipkart.dto';

@Injectable()
export class FlipkartService {
  create(createFlipkartDto: CreateFlipkartDto) {
    return 'This action adds a new flipkart';
  }

  findAll() {
    return `This action returns all flipkart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} flipkart`;
  }

  update(id: number, updateFlipkartDto: UpdateFlipkartDto) {
    return `This action updates a #${id} flipkart`;
  }

  remove(id: number) {
    return `This action removes a #${id} flipkart`;
  }
}
