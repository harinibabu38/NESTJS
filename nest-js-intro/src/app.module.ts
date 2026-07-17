import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { usersModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { AuthModule } from './auth/auth.module';

import { User } from './users/user.entity';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/profile.entity';
import { hashtagmodule } from './users/dtos/hashtag.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import  appConfig  from './config/app.config';
import databaseConfig from './config/database.config';
import EnvValidator from './config/env.validation';

const env = process.env.NODE_ENV;

@Module({
  imports: [
  usersModule,
  ProfileModule,
  TweetModule,
  AuthModule,
  hashtagmodule,
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: !env ? '.env' : `.env.${env.trim()}`,
    load:[appConfig,databaseConfig],
  validationSchema: EnvValidator
  }),
  TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
    host: configService.get('database.host'),
    port: configService.get('database.port'),
    username: configService.get('database.username'),
    password: configService.get('database.password'),
    database: configService.get('database.name'),
  }),
}),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 