import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  accessToken: string;

  @Expose()
  sub: number;

  @Expose()
  iat: number;

  @Expose()
  exp: number;
}
