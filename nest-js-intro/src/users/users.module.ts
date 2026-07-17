 import { Module ,forwardRef} from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { AuthModule } from "src/auth/auth.module";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { profile } from "console";
import { Profile } from "src/profile/profile.entity";
 
 @Module({
 
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService],
    imports:[TypeOrmModule.forFeature([User,Profile])]
  
 })
 export class usersModule{


 }