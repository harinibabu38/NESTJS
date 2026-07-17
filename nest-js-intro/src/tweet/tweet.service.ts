import { Injectable, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from 'src/users/users.service';
import { Tweet } from './tweet.entity';
import { CreateTweetdto } from 'src/users/dtos/create.-tweet-dto';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { hashtagservice } from 'src/users/dtos/hashtag.service';
import { updatetweetdto } from 'src/users/dtos/update-tweet-dto';


@Injectable()
export class TweetService {
constructor(
  private readonly userService: UserService,

  @InjectRepository(Tweet)
  private readonly tweetRepository: Repository<Tweet>,

  private readonly hashtagservice: hashtagservice,
) {}
public async getTweets(userId: number) {
  const tweets = await this.tweetRepository.find({
    where: {
      user: {
        id: userId,
      },
    },
  });

  if (!tweets || tweets.length === 0) {
    throw new NotFoundException(`No tweets found for user with id ${userId}`);
  }

  return tweets;
}
    public async CreateTweet(CreateTweetdto: CreateTweetdto) {
  const user = await this.userService.FindUserByid(CreateTweetdto.userid);

  if (!user) {
    throw new Error('User not found');
  }

  const Hashtags = await this.hashtagservice.findhashtags(
    CreateTweetdto.hashtag ?? []
  );

  const tweet = this.tweetRepository.create({
    text: CreateTweetdto.text,
    image: CreateTweetdto.image,
    user: user,
    Hashtags: Hashtags,
  });

  return await this.tweetRepository.save(tweet);
}


@Patch()
public async updateTweet(updatetweetdto: updatetweetdto) {

  // finding all hashtags
  const Hashtags = await this.hashtagservice.findhashtags(
    updatetweetdto.hashtag ?? []
  );

  // finding the tweet by id
  const tweet = await this.tweetRepository.findOneBy({
    id: updatetweetdto.id
  });

  if (!tweet) {
    throw new Error('Tweet not found');
  }

  tweet.text = updatetweetdto.text ?? tweet.text;
  tweet.Hashtags = Hashtags;

  return await this.tweetRepository.save(tweet);
}

public async deleteTweet(id: number) {
  await this.tweetRepository.delete({
    id: id,
  });
}
  




}
