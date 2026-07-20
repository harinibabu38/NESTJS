import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { TweetService } from './tweet.service';
import { CreateTweetdto } from 'src/users/dtos/create.-tweet-dto';
import { updatetweetdto } from 'src/users/dtos/update-tweet-dto';
import { PaginationQueryDto } from '../common/pagination-query-dto';



@Controller('tweet')
export class TweetController {
  constructor(
    private readonly tweetService: TweetService,
  ) {}

  @Get(':userid')
public GetTweets(
  @Param('userid', ParseIntPipe) userid: number,
@Query() pagequerydto: PaginationQueryDto
) {
  return this.tweetService.getTweets(
    userid,
    pagequerydto,
  );
}

  @Post()
  public createTweet(
    @Body() tweet: CreateTweetdto 
  ) {
    return this.tweetService.CreateTweet(tweet);
  }

  @Patch()
  public updateTweet(
  @Body() tweet: updatetweetdto,
  ) {
    return this.tweetService.updateTweet(tweet);
  }

  @Delete(':id')
  public deleteTweet(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tweetService.deleteTweet(id);
  }
}



 



    