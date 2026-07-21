import {
  Args,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';

import { Game } from './game.type';
import { GameEntity } from './game.entity';
import { GamesService } from './games.service';

import { CreateGameInput } from './dto/create.game.input';
import { UpdateGameInput } from './dto/update.game.input';

@Resolver(() => Game)
export class GamesResolver {
  constructor(
    private readonly gamesService: GamesService,
  ) {}

  
  @Query(() => [Game])
  async getGames(): Promise<GameEntity[]> {
    return this.gamesService.getGames();
  }


  @Query(() => Game, { nullable: true })
  async getGame(
    @Args('id') id: string,
  ): Promise<GameEntity | null> {
    return this.gamesService.getGame(id);
  }


  @Mutation(() => Game)
  async createGame(
    @Args('input') input: CreateGameInput,
  ): Promise<GameEntity> {
    return this.gamesService.createGame(input);
  }

  
  @Mutation(() => Game, { nullable: true })
  async updateGame(
    @Args('id') id: string,
    @Args('input') input: UpdateGameInput,
  ): Promise<GameEntity | null> {
    return this.gamesService.updateGame(id, input);
  }

  
  @Mutation(() => Boolean)
  async deleteGame(
    @Args('id') id: string,
  ): Promise<boolean> {
    return this.gamesService.deleteGame(id);
  }
}