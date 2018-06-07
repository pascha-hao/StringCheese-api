// Uncomment these imports to begin using these cool features!

// import {inject} from @loopback/context;


import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
import { User } from "../models/user";
import { Login } from "../models/login";
import { Payment } from "../models/payment";

export class UserController {

  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository
  ) {}

  @post('/users')
  async register(@requestBody() user: User) {
    return await this.userRepo.create(user);
  }

  @get('/users')
  async getAllUsers(): Promise<Array<User>> {
    return await this.userRepo.find();
  }

  @post('/login')
  async login(@requestBody() login: Login) {
    // Check that email and password are both supplied
    if (!login.email || !login.password) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    // Check that email and password are valid
    let userExists: boolean = !!(await this.userRepo.count({
      and: [
        { email: login.email },
        { password: login.password },
      ],
    }));

    if (!userExists) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    return await this.userRepo.findOne({
      where: {
        and: [
          { email: login.email },
          { password: login.password }
        ],
      },
    });
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

  @get('/users/{user_id}/donations')
  async getDonationsByUserId(
    @param.path.number('user_id') userId: number,
    @param.query.date('date_from') dateFrom: Date,
    @param.header.string('authorization') authorization: string
  ) {
    console.log(userId);
    console.log(dateFrom);
  }



  @post('/payment-methods')
  async payment(@requestBody() pay: Payment) {
    // Check that credit card info is supplied
    if (!pay.ccnum || !pay.exp || !pay.cvc || !pay.userID) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }
    else{
      var user = new User();
      //user = this.userRepo.findById(pay.userID);
      user.ccnum = "pay.ccnum";
      user.exp = "pay.exp";
      user.exp = "pay.cvc";
      this.userRepo.update(user);
    }

  }

}