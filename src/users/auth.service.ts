import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private _usersService: UsersService,
    private _jwtService: JwtService,
  ) {}

  async signup(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    // check if email exists
    const existingUser = await this._usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('email in use');
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

    const payload = { sub: user.id, email: user.email };
    // return user
    return {
      accessToken: await this._jwtService.signAsync(payload),
    };
  }

  async sigin(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this._usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new NotFoundException('user not found');
    }

    const payload = { sub: user.id, email: user.email };
    // return user
    return {
      accessToken: await this._jwtService.signAsync(payload),
      ...payload
    };
  }
}
