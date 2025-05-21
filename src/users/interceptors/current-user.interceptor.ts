// import {
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
//   Injectable,
// } from '@nestjs/common';
// import { UsersService } from '../users.service';
// import { Request } from 'express';

// @Injectable()
// export class CurrentUserInterceptor implements NestInterceptor {
//   constructor(private _userService: UsersService) {}

//   async intercept(context: ExecutionContext, handler: CallHandler<any>) {
//     const request = context.switchToHttp().getRequest();
//     const token = this.extractTokenFromHeader(request);
//     const { userId } = request.session || {};
//     if (userId) {
//       const user = await this._userService.findOne(userId);
//       request.currentUser = user;
//     }
//     return handler.handle();
//   }

//   private extractTokenFromHeader(request: Request): string | undefined {
//       const [type, token] = request.headers.authorization?.split(' ') ?? [];
//       return type === 'Bearer' ? token : undefined;
//   }
// }
