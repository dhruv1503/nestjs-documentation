import { Module } from "@nestjs/common";
import { UserService } from "./service/user.service";
import { UserController } from "./controller/Users.controllers";

@Module({
    providers : [UserService],
    controllers : [UserController]
})
export class UserModule{}