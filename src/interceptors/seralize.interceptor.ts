import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";

export interface ClassConstructor {
    new (...args: []): {}
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SealizeInterceptor(dto))
}

export class SealizeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}


    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('Im running before handler', context)

        return handler.handle().pipe(
            map((data: any) => {
                console.log('im running before response is sent out', data)
                return plainToInstance(this.dto, data,  {
                    excludeExtraneousValues: true
                })
            })
        )
    }
}