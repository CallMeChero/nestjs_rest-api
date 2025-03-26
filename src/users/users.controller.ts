import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {

    constructor(
        private _usersService: UsersService
    ) {}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this._usersService.create(body.email, body.password)
    }

    @Patch(':id')
    editUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this._usersService.update(parseInt(id), body)
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        const user = await this._usersService.findOne(parseInt(id))
        if(!user) {
            throw new NotFoundException('user not found')
        }
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this._usersService.find(email)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this._usersService.remove(id)
    }

}