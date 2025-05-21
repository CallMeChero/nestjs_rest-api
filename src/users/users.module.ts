import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/users/auth.service';
import { LocalStrategy } from './stategies/local.stategy';
import { PassportModule } from '@nestjs/passport';

export const jwtConstants = {
  secret: 'BLA BLA BLA BLA.',
};

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '100000s' },
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    LocalStrategy
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor,
    // },
  ],
  exports: [
    AuthService,
    UsersService,
    LocalStrategy
  ]
})
export class UsersModule {}
