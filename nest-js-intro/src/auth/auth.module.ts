import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/users.service';
import { usersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import authConfig from './config/auth.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[forwardRef(()=>usersModule),
    ConfigModule.forFeature(authConfig)
  ],
  exports:[AuthService]
})
export class AuthModule {}
