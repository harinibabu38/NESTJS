import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { usersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './tweet.entity';
import { hashtagmodule } from 'src/users/dtos/hashtag.module';

@Module({
  controllers: [TweetController],
  providers: [TweetService],
  imports:[usersModule,hashtagmodule,TypeOrmModule.forFeature([Tweet])]
})
export class TweetModule {}
