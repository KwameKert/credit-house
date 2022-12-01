import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { HttpProgressState, IHttpState } from '../models/common/loader.mdels';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<IHttpState>> {
    this.loaderService.state.next({
      url: request.url,
      state: HttpProgressState.start,
    });
    return next.handle(request).pipe(
      finalize(() => {
        this.loaderService.state.next({
          url: request.url,
          state: HttpProgressState.end,
        });
      })
    );
  }
}
