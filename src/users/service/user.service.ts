import { Injectable } from "@nestjs/common";
import { User } from "../interface/user.interface";


@Injectable()
export class UserService {
    private readonly users : User[] = [];

create(user : User){
  this.users.push(user)
}
findAll(){
    return this.users;
}
findUserById(id : string) : User | undefined {
return this.users.find((user) => (user.id === id));
}
}