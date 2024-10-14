import { Controller, Get, Param, Post } from '@nestjs/common';
import { XmlParserService } from './xml-parser/xml-parser.service';

@Controller('makes')
export class MakesController {
  constructor(private readonly xmlParserService: XmlParserService) {}

  @Post()
  async getAllMakes() {
    return await this.xmlParserService.fetchAndTransformData();
  }

  @Post(':id')
  getMakeById(@Param('id') id: number) {
    return this.xmlParserService.getMakeById(id);
  }
}
