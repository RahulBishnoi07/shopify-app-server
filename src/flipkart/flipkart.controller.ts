import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FlipkartService } from './flipkart.service';
import { CreateFlipkartDto } from './dto/create-flipkart.dto';
import { UpdateFlipkartDto } from './dto/update-flipkart.dto';

@Controller('flipkart')
export class FlipkartController {
  constructor(private readonly flipkartService: FlipkartService) {}

  @Post()
  create(@Body() createFlipkartDto: CreateFlipkartDto) {
    return this.flipkartService.create(createFlipkartDto);
  }

  @Get()
  findAll() {
    return this.flipkartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flipkartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlipkartDto: UpdateFlipkartDto) {
    return this.flipkartService.update(+id, updateFlipkartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flipkartService.remove(+id);
  }
}
