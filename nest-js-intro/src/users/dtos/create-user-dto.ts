import {
  IsEmail,
  IsNotEmpty,
 
  IsOptional,
 
  IsString,
  MaxLength,
 
} from 'class-validator';
import { createprofiledto } from './create-profile-dto';

export class CreateUserDto {
@IsNotEmpty()
@IsEmail()
email!: string;

 @IsNotEmpty()
 @MaxLength(100)
 userName!: string;

 @IsString()
@IsNotEmpty()
password!: string;
@IsOptional()
Profile?:createprofiledto|null

}
        

   
    
        
   