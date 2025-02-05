import { BadRequestException, Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Redirect, Req, Res} from "@nestjs/common";
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
        console.log("reached users")
    return this.userService.findAll()
    }

    @Get("wildcard/*path")
    @Redirect("https://inroute.intangles.com", 301)
    getUsersWildCard(){
        return "This is a wildcard User"
    }

    @Get("/filter")
    getUserByName(@Query("name") name  : string, @Query('age', new ParseIntPipe({errorHttpStatusCode : HttpStatus.NOT_ACCEPTABLE, exceptionFactory : ((error : string) => (new BadRequestException("Validation Error: Age needs to be a number.")))})) age : number) : string{
        console.log("reached filter")
        return `User name is ${name} whose age is ${age}`
    }

    @Get(':id')
    async getUserById(@Param() param : any) : Promise<User | {}> {
        const {id} = param;
        const user =  this.userService.findUserById(id);
        return user ? user : {}
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