import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

export class ErrorHandleInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('ErrorHandleInterceptor executado ANTES');

    // await new Promise(resolve => setTimeout(resolve, 30000));
    return next.handle().pipe(
      catchError(error => {
        return throwError(() => {
          if (error.name === 'NotFoundException') {
            return new BadRequestException(error.message);
          }

          return new BadRequestException('Ocorreu um erro desconhecido');
        });
      }),
    );
  }
}
