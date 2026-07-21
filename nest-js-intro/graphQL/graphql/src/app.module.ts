import { Module } from '@nestjs/common';
import {
  ApolloDriver,
  ApolloDriverConfig,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GamesModule } from './games/games.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'graphql',
      autoLoadEntities: true,
      synchronize: true,
    }),

    GamesModule,
  ],
})
export class AppModule {}