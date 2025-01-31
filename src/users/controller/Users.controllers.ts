import { Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Put, Query, Redirect, Req, Res} from "@nestjs/common";
import { Request, Response } from "express";
import {v4 as uuid} from "uuid";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { UserService } from "../service/user.service";
import { User } from "../interface/user.interface";


@Controller("users")
export class UserController{
    constructor(private userService : UserService){}
    @Post()
    createUser(@Body() user : CreateUserDto){
        const userWithId = {...user, id : uuid()};
        return this.userService.create(userWithId);
    }

    @Get()
    async getUsers(@Req() request : Request) : Promise<User[]>{
    return this.userService.findAll()
    }

    @Get("wildcard/*path")
    @Redirect("https://inroute.intangles.com", 301)
    getUsersWildCard(){
        return "This is a wildcard User"
    }

    @Get(':id')
    async getUserById(@Param() param : any) : Promise<User | {}> {
        const {id} = param;
        const user =  this.userService.findUserById(id);
        return user ? user : {}
    }

    @Get()
    getUserByName(@Query("name") name  : string, @Query('age') age : number) : string{
        return `User name is ${name} whose age is ${age}`
    }
    
    @Put(":id")
    updateUser(@Param("id") id : string, @Body() updateUserBody : UpdateUserDto){
        return `User of id # ${id} has been updated`
    }

    @Delete(":id")
    deleteUser(@Param("id") id : string){
        return `User id # ${id} is deleted`
    }
    
}