import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { MakeType } from './make.graphql';
import { XmlParserService } from 'src/xml-parser/xml-parser.service';

@Resolver(() => MakeType)
export class MakesResolver {
  constructor(private readonly xmlParserService: XmlParserService) {}

  @Query(() => [MakeType])
  async makes(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Args('offset', { type: () => Int, defaultValue: 0 }) offset: number,
  ) {
    const allMakes = await this.xmlParserService.fetchAndTransformData();

    const paginatedMakes = allMakes.slice(offset, offset + limit);
    
    return paginatedMakes;
  }
}
