import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private _repo: Repository<User>
    ) {}

    create(email: string, password: string) {
        const user = this._repo.create({email, password});

        return this._repo.save(user)
    }
}
