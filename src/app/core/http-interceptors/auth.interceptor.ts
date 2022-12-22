import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TOKEN } from '../models/common/common.constants';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const storedToken = this.localStorageService.getStorageValue(TOKEN);
    let authReq = request.clone();
    if (storedToken) {
      authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${storedToken}`,
          //...request?.headers,
        },
      });
    }

    return next.handle(authReq);
  }
}
