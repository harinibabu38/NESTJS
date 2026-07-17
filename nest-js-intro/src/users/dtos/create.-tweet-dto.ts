import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

 export class CreateTweetdto{
    @IsNotEmpty()
    @IsString()
    text?:string;

    @IsOptional()
    image?:string;

    @IsNumber()
    @IsNotEmpty()
    userid!:number;
    
    @IsOptional()
   
     @IsArray()
    hashtag!:number[]

  }