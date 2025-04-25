import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

    constructor(
        private _userService: UsersService
    ) {}

    async intercept(context: ExecutionContext, handler: CallHandler<any>) {
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session || {};
        // console.log(request)
        if(userId) {
            const user = await this._userService.findOne(userId);
            request.currentUser = user;
        }

        return handler.handle();
    }
}