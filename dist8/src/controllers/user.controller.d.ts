import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
import { Login } from "../models/login";
import { Payment } from "../models/payment";
export declare class UserController {
    private userRepo;
    constructor(userRepo: UserRepository);
    register(user: User): Promise<User>;
    getAllUsers(): Promise<Array<User>>;
    login(login: Login): Promise<{
        token: string;
    }>;
    findUsersById(id: number): Promise<User>;
    getUserbyKey(jwt: string): Promise<string | object>;
    deleteUserbyID(id: number): Promise<void>;
    getDonationsByUserId(userId: number, dateFrom: Date, authorization: string): Promise<void>;
    createUser(user: User): Promise<{
        token: string;
    }>;
    payment(pay: Payment): Promise<void>;
    loginWithQuery(login: Login): Promise<User>;
    updateUserById(id: number, user: User): Promise<boolean>;
}
