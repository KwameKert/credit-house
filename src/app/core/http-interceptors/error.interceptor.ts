import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store/models/root.model';
import { fromAuthActions } from 'src/app/store/actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store<RootState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              case 401:
                this.store.dispatch(fromAuthActions.forceLogout());
            }
          }
        }
      )
    );
  }
}
