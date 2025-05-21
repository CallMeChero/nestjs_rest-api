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
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private _usersService: UsersService,
    private _authService: AuthService,
  ) {}

  // @Get('/colors/:color')
  // setColor(@Param('color') color: string, @Session() session: any) {
  //     session.color = color;
  // }

  // @Get('/colors')
  // getColor(@Session() session: any) {
  //     return session.color;
  // }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    console.log(user);
    return user;
  }

  @Post('/signout')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const token = await this._authService.signup(body.email, body.password);
    console.log(token)
    return token;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto) {
    const token = await this._authService.sigin(body.email, body.password);
    return token;
  }

  @Patch(':id')
  editUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this._usersService.update(parseInt(id), body);
  }

  // @UseInterceptors(new SealizeInterceptor(UserDto))
  // @Serialize(UserDto)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    console.log('handler running');
    const user = await this._usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this._usersService.find(email);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this._usersService.remove(id);
  }
}
