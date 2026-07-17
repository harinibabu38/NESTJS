import { PartialType } from "@nestjs/mapped-types";
import { CreateTweetdto } from "./create.-tweet-dto";
import { IsInt, IsNotEmpty } from "class-validator";

 



 export class updatetweetdto extends PartialType(CreateTweetdto){
     @IsInt()
    @IsNotEmpty()
    id!:number;
 }