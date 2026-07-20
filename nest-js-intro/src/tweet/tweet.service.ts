import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

import { Tweet } from './tweet.entity';

import { CreateTweetdto } from 'src/users/dtos/create.-tweet-dto';
import { updatetweetdto } from 'src/users/dtos/update-tweet-dto';
import { PaginationQueryDto } from '../common/pagination-query-dto';

import { hashtagservice } from 'src/users/dtos/hashtag.service';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UserService,

    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,

    private readonly hashtagservice: hashtagservice,
  ) {}

  
  public async getTweets(
    userId: number,
pagequerydto: PaginationQueryDto
  ) {
    const page = pagequerydto.page ?? 1;
    const limit = pagequerydto.limit ?? 10;

    const tweets = await this.tweetRepository.find({
      where: {
        user: {
          id: userId,
        },
      },

      skip: (page - 1) * limit,
      take: limit,
    });

    if (!tweets || tweets.length === 0) {
      throw new NotFoundException(
        `No tweets found for user with id ${userId}`,
      );
    }

    return tweets;
  }


  public async CreateTweet(
createTweetDto: CreateTweetdto
  ) {
    const user = await this.userService.FindUserByid(
      createTweetDto.userid,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashtags =
      await this.hashtagservice.findhashtags(
        createTweetDto.hashtag ?? [],
      );

    const tweet = this.tweetRepository.create({
      text: createTweetDto.text,
      image: createTweetDto.image,
      user: user,
      Hashtags: hashtags,
    });

    return await this.tweetRepository.save(tweet);
  }

  
  public async updateTweet(
   updatetweetdto: updatetweetdto
  ) {
    const hashtags =
      await this.hashtagservice.findhashtags(
        updatetweetdto.hashtag ?? [],
      );

    const tweet =
      await this.tweetRepository.findOneBy({
        id: updatetweetdto.id,
      });

    if (!tweet) {
      throw new NotFoundException(
        'Tweet not found',
      );
    }

    tweet.text =
      updatetweetdto.text ?? tweet.text;

    tweet.Hashtags = hashtags;

    return await this.tweetRepository.save(tweet);
  }
  public async deleteTweet(id: number) {
    const tweet =
      await this.tweetRepository.findOneBy({
        id: id,
      });

    if (!tweet) {
      throw new NotFoundException(
        'Tweet not found',
      );
    }

    await this.tweetRepository.delete({
      id: id,
    });

    return {
      message: 'Tweet deleted successfully',
    };
  }
}
