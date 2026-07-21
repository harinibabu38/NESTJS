import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GamesResolver } from './games.resolver';
import { GamesService } from './games.service';
import { GameEntity } from './game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameEntity]),
  ],
  providers: [
    GamesResolver,
    GamesService,
  ],
})
export class GamesModule {}
