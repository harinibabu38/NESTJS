import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

 export class createprofiledto{

    @IsString({message:'first name should be a string value'})
    @IsOptional()
    @MinLength(3,{message:'first name should have a min of three character'})
    @MaxLength(100)
    
    firstName?: 'string';
    
    @IsString({message:'last name should be a string value'})
    @IsOptional()
    @MinLength(3,{message:'last name should have a min of three character'})
    @MaxLength(100)
    
    lastName?:string;

    @IsString()
    @IsOptional()
    @MaxLength(10)

    gender?:string

     @IsOptional()
     @IsDate()
    dateOfBirth?:Date;

    @IsString()
    @IsOptional()
    bio?:string;

    
    @IsString()
    @IsOptional()
    image?:string;
 }