import { Body, Controller, Delete, Param, ParseIntPipe, Post, } from "@nestjs/common";
import { hashtagservice } from "./hashtag.service";
import { CreateHashtagDto } from "./create.hashtag.dto";

 


 @Controller('hashtag')
 export class hastagcontroller{
    constructor(private readonly hashtagservice:hashtagservice){}


    @Post()
    public createnewhashtag(@Body() createhashtagdto:CreateHashtagDto){
        return this.hashtagservice.createhashtagRepository(createhashtagdto)
    }

    @Delete(':id')
    public deletehashtag(@Param('id',ParseIntPipe)id:number){
        return this.hashtagservice.deletehashtag(id);

    }
 @Delete('softDelete/:id')
    public softdeletehashtag(@Param('id',ParseIntPipe)id:number){
        return this.hashtagservice.softdeletehashtag(id);

    }


 }