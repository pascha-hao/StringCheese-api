import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
import { Login } from "../models/login";
export declare class UserController {
    private userRepo;
    constructor(userRepo: UserRepository);
    createUser(user: User): Promise<User>;
    getAllUsers(): Promise<Array<User>>;
    login(login: Login): Promise<void>;
    findUsersById(id: number): Promise<User>;
}
