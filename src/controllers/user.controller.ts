import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, patch, del, requestBody, HttpErrors, param } from "@loopback/rest";
import { User } from "../models/user";
import { Login } from "../models/login";
import { Post } from "../models/post";
import { PaymentMethod } from "../models/payment-methods";
import { Donation } from "../models/donation";
import { sign, verify } from'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { CharityRepository } from "../repositories/charity.repository";
import { DonationRepository } from "../repositories/donation.repository";
import { PostRepository } from "../repositories/post.repository";

import { Edit } from "../models/edit";



export class UserController {

  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository,
    @repository(CharityRepository.name) private charityRepo: CharityRepository,
    @repository(DonationRepository.name) private donationRepo: DonationRepository,
    @repository(PostRepository.name) private postRepo: PostRepository
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
  async login(@requestBody() login: Login): Promise<any> {
    var users = await this.userRepo.find();

    var username = login.email;
    console.log(login.email);
    console.log(login.password);

    for (var i = 0; i < users.length; i++) {
      var user = users[i];
 
      console.log(user.password);

      if (user.email == username && await bcrypt.compare(login.password, user.password)) {
        console.log("yay");
        var jwt = sign(
          {
            user: {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email
            },
            anything: "hello"
          },
          'shh',
          {
            issuer: 'auth.ix.co.za',
            audience: 'ix.co.za',
          },
        );
        
        return {
          token: jwt,
          something: "lol"
        };
      }
    }

    throw new HttpErrors.Unauthorized('User not found, sorry!');
    //return "Error";
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

  @get('/users')
  async getUserbyKey(@param.query.string('jwt') jwt: string) {
      if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required.');

      try {
        var jwtBody = verify(jwt, 'shh');
        console.log(jwtBody);
        return jwtBody;
      } 
      catch (err) {
        throw new HttpErrors.BadRequest('JWT token invalid');
      }
  }

  @del('/users')
  async deleteUserbyID(@param.path.number('id') id: number) {
      let userExists: boolean = !!(await this.userRepo.count({ id }));
      if (userExists) {
        this.userRepo.deleteById(id);
      }
      else {
          throw new HttpErrors.BadRequest(`user ID ${id} does not exist`);
      }
  }

  // @get('/users/{user_id}/donations')
  // async getDonationsByUserId(
  //   @param.path.number('user_id') userId: number,
  //   @param.query.date('date_from') dateFrom: Date,
  //   @param.header.string('authorization') authorization: string
  // ) {
  //   console.log(userId);
  //   console.log(dateFrom);
  // }

  @post('/register')
  async createUser(@requestBody() user: User) {

    let hashedPassword = await bcrypt.hash(user.password, 10);

    var userToStore = new User();
    userToStore.firstname = user.firstname;
    userToStore.lastname = user.lastname;
    userToStore.email = user.email;
    userToStore.password = hashedPassword;

    let userExists: boolean = !!(await this.userRepo.count({ email: user.email }));
    if (userExists) {
      throw new HttpErrors.BadRequest("Email already Exists");
    }

    let storedUser = await this.userRepo.create(userToStore);
    storedUser.password = "";


    var jwt = sign(
      {
        user: storedUser,
      },
      'shh',
      {
        issuer: 'auth.ix.co.za',
        audience: 'ix.co.za',
      },
    );

    return {
      token: jwt,
    };
  }

  @post('/edit')
  async editUser(
    @requestBody() edit: Partial<User>,
    @param.query.string('jwt') jwt: string) {
    
    let userId = null;

    try {
      userId = (verify(jwt, 'shh') as any).user.id;
    } catch {
      throw new HttpErrors.Unauthorized("Invalid JWT.");
    }

    

    await this.userRepo.updateById(userId, edit);

    var jwt = sign(
      {
        user: await this.userRepo.findById(userId),
      },
      'shh',
      {
        issuer: 'auth.ix.co.za',
        audience: 'ix.co.za',
      },
    );

    return {
      token: jwt,
    };
  }

  @post('/donation')
  async createDonation(@requestBody() donation: Donation) {
    console.log(donation.charity_id);
    console.log(donation.user_id);
    console.log(donation.amount);
    console.log(donation.charity_name);
    //console.log(donation.donate_date);
    var donationToStore = new Donation();
    donationToStore.charity_id = donation.charity_id;
    donationToStore.user_id = donation.user_id;
    donationToStore.amount = donation.amount;
    donationToStore.charity_name = donation.charity_name;
    donationToStore.is_subscription = false;
    donationToStore.date = donation.date;

    this.donationRepo.create(donationToStore);

  }

  @post('/subscribe')
  async subscribe(@requestBody() donation: Donation) {
    //console.log(donation.is_subscription);
    //console.log(donation.donate_date);
    var donationToStore = new Donation();
    donationToStore.charity_id = donation.charity_id;
    donationToStore.user_id = donation.user_id;
    donationToStore.amount = donation.amount;
    donationToStore.charity_name = donation.charity_name;
    donationToStore.is_subscription = true;
    donationToStore.date = donation.date;

    this.donationRepo.create(donationToStore);

  }

  @post('/favorite')
  async favorite(@requestBody() post: Post) {
    console.log(post.charity_id);
    console.log(post.user_id);
    //console.log(donation.donate_date);
    var postToStore = new Post();
    postToStore.charity_id = post.charity_id;
    postToStore.user_id = post.user_id;

    this.postRepo.create(postToStore);

  }

  // @post('/unfavorite')
  // async unfavorite(@requestBody() post: Post) {
  //   console.log(post.charity_id);
  //   console.log(post.user_id);
  //   //console.log(donation.donate_date);
  //   var postToStore = new Post();
  //   postToStore.charity_id = post.charity_id;
  //   postToStore.user_id = post.user_id;
  //   return await this.userRepo.updateById(userId, unfavorite);
  //   this.postRepo.destroyById(postToStore);

  // }

  @post('/unfavorite')
  async unfavorite(
    @requestBody() user_id: number, charity_id: number) {
    var tempPost = await this.postRepo.find({where: {and: [{user_id: user_id}, {charity_id: charity_id}]}});
    if (tempPost.length ==0) throw new HttpErrors.Unauthorized('favorite not found');
    return await this.postRepo.delete(tempPost[0]);
  }



  @post('/payment-methods')
  async payment(@requestBody() pay: PaymentMethod) {
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

  @post('/login-with-query')
  async loginWithQuery(@requestBody() login: Login): Promise<User> {
    var users = await this.userRepo.find({
      where: {
        and: [{ email: login.email }, { password: login.password }],
      },
    });

    if (users.length == 0) {
      throw new HttpErrors.NotFound('User not found, sorry!');
    }

    return users[0];
  }

  @patch('/user/{id}')
  async updateUserById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<boolean> {
    id = +id;
    return await this.userRepo.updateById(id, user);
  }

  @get('/donations')
  async getDonationsbyUserId(
  @param.query.string('jwt') jwt: string): Promise<Array<Donation>> {

    try {
      let jwtBody = verify(jwt, 'shh') as any;
      return await this.donationRepo.find({where: {user_id: jwtBody.user.id}});
    } catch (err) {
      throw new HttpErrors.Unauthorized();
    }
  }

  // @get('/donations')
  // async getAllDonations(@requestBody() donation: Donation): Promise<Array<Donation>> {
  //   return await this.donationRepo.find();
  // }

}
