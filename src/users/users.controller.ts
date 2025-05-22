import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  NotFoundException,
  Session,
  UseGuards,
  Request
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private _usersService: UsersService,
    private _authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const token = await this._authService.signup(body);
    return token;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signin(@Request() req) {
    const token = await this._authService.sigin(req.user as CreateUserDto);
    return token;
  }

  @Post('/signout')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  editUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this._usersService.update(parseInt(id), body);
  }

  // @UseInterceptors(new SealizeInterceptor(UserDto))
  // @Serialize(UserDto)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this._usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this._usersService.findByEmail(email);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this._usersService.remove(id);
  }
}
