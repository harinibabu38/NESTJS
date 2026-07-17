import { Injectable, Inject, forwardRef } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { UserService } from 'src/users/users.service';
import authConfig from './config/auth.config';


@Injectable()
export class AuthService {

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {}

  isAuthenticated = false;

  login(email: string, pswd: string) {
    console.log(this.authConfiguration);

    return 'user does not exist';
  }
}
