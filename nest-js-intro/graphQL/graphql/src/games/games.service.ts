import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GameEntity } from './game.entity';
import { CreateGameInput } from './dto/create.game.input';
import { UpdateGameInput } from './dto/update.game.input';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gamesRepository: Repository<GameEntity>,
  ) {}

  
  async getGames(): Promise<GameEntity[]> {
    return this.gamesRepository.find();
  }

  
  async getGame(id: string): Promise<GameEntity | null> {
    return this.gamesRepository.findOne({
      where: {
        id,
      },
    });
  }

  
  async createGame(
    input: CreateGameInput,
  ): Promise<GameEntity> {
    const game = this.gamesRepository.create(input);

    return this.gamesRepository.save(game);
  }


  async updateGame(
    id: string,
    input: UpdateGameInput,
  ): Promise<GameEntity | null> {
    await this.gamesRepository.update(id, input);

    return this.gamesRepository.findOne({
      where: {
        id,
      },
    });
  }

  
  async deleteGame(id: string): Promise<boolean> {
    const result = await this.gamesRepository.delete(id);

    return result.affected === 1;
  }
}