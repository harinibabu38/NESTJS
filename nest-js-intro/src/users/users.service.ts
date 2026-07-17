import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { Profile } from 'src/profile/profile.entity';
import { CreateUserDto } from './dtos/create-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    private readonly configService: ConfigService,
  ) {}

  public async getAllUsers() {
    try {
      return await this.userRepository.find({
        relations: {
          profile: true,
        },
      });
    } catch (error: any) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'An error occurred. Please try again later.',
        );
      }

      throw error;
    }
  }

  public async createUser(userDto: CreateUserDto) {
    try {
      const profile = this.profileRepository.create(userDto.Profile ?? {});

      const existingUserWithUsername = await this.userRepository.findOne({
        where: {
          userName: userDto.userName,
        },
      });

      if (existingUserWithUsername) {
        throw new BadRequestException(
          `Username ${userDto.userName} already exists`,
        );
      }

      const existingUserWithEmail = await this.userRepository.findOne({
        where: {
          email: userDto.email,
        },
      });

      if (existingUserWithEmail) {
        throw new BadRequestException(
          `Email ${userDto.email} already exists`,
        );
      }

      const user = this.userRepository.create({
        ...userDto,
        profile,
      });

      return await this.userRepository.save(user);
    } catch (error: any) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'An error occurred. Please try again later.',
        );
      }

      throw error;
    }
  }

  public async deleteUser(id: number) {
    await this.userRepository.delete(id);

    return 'Deleted successfully';
  }

  public async FindUserByid(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with ID ${id} was not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }
}

      


  

 
 




   

    
