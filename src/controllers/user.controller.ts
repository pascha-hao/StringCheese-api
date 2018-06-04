// Uncomment these imports to begin using these cool features!

// import {inject} from @loopback/context;


import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody } from "@loopback/rest";
import { User } from "../models/user";
import { Login } from "../models/login";

export class UserController {

  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository
  ) {}

  @post('/users')
  async createUser(@requestBody() user: User) {
    return await this.userRepo.create(user);
  }

  @get('/users')
  async getAllUsers(): Promise<Array<User>> {
    return await this.userRepo.find();
  }

  @post('/login')
  async login(@requestBody() login: Login) {
    var users = await this.userRepo.find();
    var email = login.email;
    var password = login.password;
    for(var i = 0; i < users.length; i++) {
      if(users[i].email == email && users[i].password == password){
        break;
      }

      if(i == users.length - 1){
        throw new Error("Invalid email or password!");
      }
    }
  }

}