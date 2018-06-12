import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
import { Login } from "../models/login";
import { Payment } from "../models/payment";
export declare class UserController {
    private userRepo;
    constructor(userRepo: UserRepository);
    register(user: User): Promise<User>;
    getAllUsers(): Promise<Array<User>>;
    login(login: Login): Promise<User>;
    findUsersById(id: number): Promise<User>;
    getDonationsByUserId(userId: number, dateFrom: Date, authorization: string): Promise<void>;
    user(user: User): Promise<User>;
    payment(pay: Payment): Promise<void>;
}
