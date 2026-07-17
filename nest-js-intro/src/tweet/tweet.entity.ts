
import { hashtag } from '../users/dtos/hashtag.entity';
import { User } from '../users/user.entity';

import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, UpdateDateColumn } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { JoinTable } from "typeorm";

 
 @Entity()
 export class Tweet{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({
        type:'text',
        nullable:false
    })
    text?:string;

     @Column({
        type:'text',
        nullable:true

     })

    image?:string;



    @CreateDateColumn()
    createdAt!:Date;

    @UpdateDateColumn()
    updatedAt!:Date;


     @ManyToOne(()=>User,(User)=>User.tweets, {eager:true})
    user!:User;

    @ManyToMany(()=>hashtag, (hashtag)=> hashtag.Tweets)
    @JoinTable()
    Hashtags!:hashtag[];





 }