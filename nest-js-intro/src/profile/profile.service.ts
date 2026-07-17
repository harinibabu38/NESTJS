import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { profile } from 'console';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository:Repository<Profile>
    ){}

    public getAllUsers(){
        return this.profileRepository.find({
            relations:{
                user:true
            }
        })
    }


    }

