import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store/models/root.model';
import { fromAuthActions } from 'src/app/store/actions';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<RootState>,
    private notificationSerivce: NotificationService
  ) {}

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
                break;
              case 400:
              case 500:
                this.notificationSerivce.error(err.error.message);
                break;
            }
          }
        }
      )
    );
  }
}
