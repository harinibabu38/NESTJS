import { hashtag } from './hashtag.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository ,} from "typeorm";
import { CreateHashtagDto } from './create.hashtag.dto';






@Injectable()
export class hashtagservice{
    constructor(
        @InjectRepository(hashtag)
        private readonly hashtagrepository:Repository<hashtag>){}



        public async createhashtagRepository(createhashtagdto:CreateHashtagDto){
           let hashtag = this.hashtagrepository.create(createhashtagdto)
           return await this.hashtagrepository.save(hashtag)
     }

     public async findhashtags(hashtag:number[])
     {
       return await this.hashtagrepository.find({
            where:{id :In(hashtag)}
        })
     }

     public async deletehashtag(id:number){
        await this.hashtagrepository.delete({id:id})
        return {deleted:true,id:id}
     }


     public async softdeletehashtag(id:number){
        await this.hashtagrepository.softDelete({id:id})
        return {deleted:true,id:id}
     }

     
}
