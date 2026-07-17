import { User } from "src/users/user.entity";
import { OneToOne } from "typeorm";

import { Entity, Column ,PrimaryGeneratedColumn} from "typeorm";
import { JoinColumn } from "typeorm";

@Entity()
export class Profile {@OneToOne(() => User, (user) => user.profile, {
  onDelete: 'CASCADE',
})
   @JoinColumn()
   user!:User;


    @PrimaryGeneratedColumn()
        id!:Number;
    


@Column({
    type: 'varchar',
    nullable:true,
    length: 100
})
firstName!:String;

@Column({
    type: 'varchar',
    nullable: true,
    length: 100
})
lastName!:String;

@Column({
    type: 'varchar',
    nullable: true,
    length: 10
})
gender!: String;
 @Column({
    type:'date',
    nullable:true
 })
dateOfBirth!:Date;


@Column({
    type:'text',
    nullable:true
})
bio!:String;

@Column({
    type: 'text',
    nullable: true
})
image!: String;
}












