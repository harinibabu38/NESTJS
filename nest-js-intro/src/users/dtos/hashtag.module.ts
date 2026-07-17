import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { hashtag } from './hashtag.entity';
import { hashtagservice } from './hashtag.service';
import { hastagcontroller } from './hashtag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([hashtag])],
  controllers: [hastagcontroller],
  providers: [hashtagservice],
  exports:[hashtagservice]
})
export class hashtagmodule {}