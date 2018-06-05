// Uncomment these imports to begin using these cool features!

// import {inject} from @loopback/context;


import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
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
    if (!login.email || !login.password) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }
    var users = await this.userRepo.find();
    var email = login.email;
    var password = login.password;
    for(var i = 0; i < users.length; i++) {
      if(users[i].email == email && users[i].password == password){
        break;
      }

      if(i == users.length - 1){
        throw new HttpErrors.Unauthorized('invalid credentials');
      }
    }
  }

  @get('/users/{id}')
  async findUsersById(@param.path.number('id') id: number): Promise<User> {
    // Check for valid ID
    let userExists: boolean = !!(await this.userRepo.count({ id }));

    if (!userExists) {
      throw new HttpErrors.BadRequest(`user ID ${id} does not exist`);
    }

    return await this.userRepo.findById(id);
  }

}