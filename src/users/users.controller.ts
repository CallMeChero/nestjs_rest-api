import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
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
        this._usersService.create(body.email, body.password)
    }

    @Patch(':id')
    editUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        this._usersService.update(parseInt(id), body)
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this._usersService.findOne(parseInt(id))
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