 import {
     Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dtos/create-user-dto';


 
@Controller('users')
export class UserController {
  
  constructor(private userService:UserService) {
    
  }

   @Get()
  getUsers(){
    
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUsersbyid(@Param('id',ParseIntPipe)id:number){
    
    return this.userService.FindUserByid(id);
  } 

  
  @Post()
  createuser(@Body()Users:CreateUserDto) {
    return this.userService.createUser(Users);
   
  }

  @Delete()
  public deleteUser(@Param('id',ParseIntPipe)id:number){
    this.userService.deleteUser(id)
  }
}
    
   


  

  


