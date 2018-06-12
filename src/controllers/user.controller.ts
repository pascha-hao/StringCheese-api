import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, patch, del, requestBody, HttpErrors, param } from "@loopback/rest";
import { User } from "../models/user";
import { Login } from "../models/login";
import { Payment } from "../models/payment";
import { sign, verify } from'jsonwebtoken';
import * as bcrypt from 'bcrypt';

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
      ],
    }));

    if (!userExists) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    else {
      var currentUser = await this.userRepo.findOne({
        where: {
          and: [
            { email: login.email },
          ],
        },
      });

      let same = await bcrypt.compare(login.password, currentUser.password);

      if (same) {
        var jwt = sign(
          {
            user: currentUser,
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
      else {
        throw new HttpErrors.Unauthorized('Invalid Login Information');
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

  @get('/users/{user_id}/donations')
  async getDonationsByUserId(
    @param.path.number('user_id') userId: number,
    @param.query.date('date_from') dateFrom: Date,
    @param.header.string('authorization') authorization: string
  ) {
    console.log(userId);
    console.log(dateFrom);
  }

  @post('/register')
  async createUser(@requestBody() user: User) {
    // Check that email and password are both supplied
    if (!user.email || !user.password || !user.firstname || !user.lastname) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    // Check that email is valid
    let userExists: boolean = !!(await this.userRepo.count({ username: user.username }));

    if (userExists) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    let emailExists: boolean = !!(await this.userRepo.count({ email: user.email }));

    if (emailExists) {
      throw new HttpErrors.BadRequest('email is already registered');
    }

    let hashedPassword = await bcrypt.hash(user.password, 10);

    var userToStore = new User();
    userToStore.firstname = user.firstname;
    userToStore.lastname = user.lastname;
    userToStore.username = user.username;
    userToStore.email = user.email;
    userToStore.dob = user.dob;
    userToStore.password = hashedPassword;

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


}