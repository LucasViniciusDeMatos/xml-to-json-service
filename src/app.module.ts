import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { XmlParserService } from './xml-parser/xml-parser.service';
import { MakesController } from './makes.controller';
import { SharedService } from './shared.service';
import { MakesResolver } from './resolvers/make.resolver';

@Module({
  imports: [
    HttpModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/graphql/schema.gql',
    }),
  ],
  controllers: [MakesController],
  providers: [SharedService, XmlParserService, MakesResolver],
})
export class AppModule {}
