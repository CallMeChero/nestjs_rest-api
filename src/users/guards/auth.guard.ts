// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   UnauthorizedException,
//   NotFoundException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';
// import { jwtConstants } from 'src/auth/auth.module';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private _jwtService: JwtService
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const token = this.extractTokenFromHeader(request);
//     if (!token) {
//       throw new UnauthorizedException();
//     }
//     try {
//       const payload = await this._jwtService.verifyAsync(token, {
//         secret: jwtConstants.secret,
//       });

//       // 💡 We're assigning the payload to the request object here
//       // so that we can access it in our route handlers
//       request['currentUser'] = payload;
//     } catch {
//       throw new UnauthorizedException();
//     }
//     return true;
//   }

//   private extractTokenFromHeader(request: Request): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }
