import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from "util";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(
        private _usersService: UsersService
    ) {}

    async signup(email: string, password: string) {
        // check if email exists
        const users = await this._usersService.find(email);
        if(users.length) {
            throw new BadRequestException('email in use')
        }
        // hash pwd
        // generate salt
        const salt = randomBytes(8).toString('hex');

        // hash the salt and the password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex');
 
        // create a new user
        const user = await this._usersService.create(email, result);

        // return user
        return user;
    }

    sigin() {}
}