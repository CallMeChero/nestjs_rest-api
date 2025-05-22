import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('usao tu')
    // const user = await this.authService.sigin({ email: username, password});
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    return { email: username, password};
  }
}