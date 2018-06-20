import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
import { Login } from "../models/login";
import { Payment } from "../models/payment";
import { Donation } from "../models/donation";
import { CharityRepository } from "../repositories/charity.repository";
import { DonationRepository } from "../repositories/donation.repository";
import { Edit } from "../models/edit";
export declare class UserController {
    private userRepo;
    private charityRepo;
    private donationRepo;
    constructor(userRepo: UserRepository, charityRepo: CharityRepository, donationRepo: DonationRepository);
    register(user: User): Promise<User>;
    getAllUsers(): Promise<Array<User>>;
    login(login: Login): Promise<any>;
    findUsersById(id: number): Promise<User>;
    getUserbyKey(jwt: string): Promise<string | object>;
    deleteUserbyID(id: number): Promise<void>;
    createUser(user: User): Promise<{
        token: string;
    }>;
    editUser(edit: Edit): Promise<{
        token: string;
    }>;
    createDonation(donation: Donation): Promise<void>;
    payment(pay: Payment): Promise<void>;
    loginWithQuery(login: Login): Promise<User>;
    updateUserById(id: number, user: User): Promise<boolean>;
    getDonationsbyUserId(jwt: string): Promise<Array<Donation>>;
}
