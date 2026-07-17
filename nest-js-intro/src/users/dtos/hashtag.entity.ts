import { Column, Entity, PrimaryGeneratedColumn ,ManyToMany, DeleteDateColumn} from "typeorm";
import { Tweet } from "src/tweet/tweet.entity";

 

 @Entity()
 export class hashtag{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({
        type:'text',
        nullable:false

    })
    name!:string;

    
    @DeleteDateColumn()
    DeletedAt!:Date;



    
  @ManyToMany(() => Tweet, (tweet) => tweet.Hashtags)
  Tweets!: Tweet[];
 }