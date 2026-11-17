import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { of, tap } from 'rxjs';

@Injectable()
export class SimpleCacheInterceptor implements NestInterceptor {
  private readonly cache = new Map();

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // ('SimpleCacheInterceptor executado ANTES');
    const request = context.switchToHttp().getRequest();
    const url = request.url;

    if (this.cache.has(url)) {
      ('Está no cache');
      return of(this.cache.get(url));
    }

    await new Promise(resolve => setTimeout(resolve, 3000));

    return next.handle().pipe(
      tap(data => {
        this.cache.set(url, data);
        ('Armazenado em cache: ', url);
      }),
    );
  }
}
