import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

jest.mock('../interceptors/serialize.interceptor', () => ({
  Serialize: () => () => {},
}));

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: (email: string) =>
        Promise.resolve([{ id: 1, email: email, password: '1' }] as User[]),
      findOne: (id: number) =>
        Promise.resolve({ id, email: 'asdf@asdf.com', password: '1' } as User),
      // remove: (id: any) => Promise.resolve(),
      // update: () => {}
    };

    fakeAuthService = {
      // signup: () => {},
      sigin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers should return a list of users with given email', async () => {
    const users = await controller.findAllUsers('asdf@asdf.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@asdf.com');
  });

  it('getUser should return a single user with given id', async () => {
    const user = await controller.getUser('1');

    expect(user).toEqual({
      email: 'asdf@asdf.com',
      id: 1,
      password: '1',
    } as User);
  });

  it('getUser should return an error if user not found', async () => {
    fakeUsersService.findOne = (id: number) => Promise.resolve(null);
    await expect(controller.getUser('1')).rejects.toThrow(NotFoundException);
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: -1 };
    const user = await controller.signin(
      { email: 'asdf@asdf.com', password: 'asdf' },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
