import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

    constructor(
        private _usersService: UsersService
    ) {}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this._usersService.create(body.email, body.password)
    }

}