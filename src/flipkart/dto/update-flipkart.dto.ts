import { PartialType } from '@nestjs/mapped-types';
import { CreateFlipkartDto } from './create-flipkart.dto';

export class UpdateFlipkartDto extends PartialType(CreateFlipkartDto) {}
