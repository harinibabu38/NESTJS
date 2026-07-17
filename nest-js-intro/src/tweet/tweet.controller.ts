import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post,Delete } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { get } from 'http';
import { CreateTweetdto, } from 'src/users/dtos/create.-tweet-dto';
import { Tweet } from './tweet.entity';
import { updatetweetdto } from 'src/users/dtos/update-tweet-dto';

@Controller('tweet')
export class TweetController {
    constructor(private tweetService:TweetService ) {}
        
    


@Get(':userid')
public GetTweets(@Param('userid',ParseIntPipe)userid:number){
   return this.tweetService.getTweets(userid)
}
@Post()
public CreateTweet(@Body() tweet:CreateTweetdto){
    return this.tweetService.CreateTweet(tweet)
}
@Patch()
public updatetweet(@Body()Tweet : updatetweetdto){ 
    this.tweetService.updateTweet(Tweet);
}


@Delete(':id')
public deletetweet(@Param('id',ParseIntPipe)id:number){
   return this.tweetService.deleteTweet(id);
}

}



 



    