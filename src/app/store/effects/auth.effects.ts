import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {} from '@ngrx/store';
import { of } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import * as fromAuthActions from '../actions/auth.actions';
import {
  LoginRequest,
  LoginResponse,
} from '../../core/models/authentication/auth.model';
import { map, switchMap, catchError } from 'rxjs/operators';
import { TypedAction } from '@ngrx/store/src/models';
import { NotificationService } from '../../core/services/notification.service';
import { AuthState } from '../models/auth.model';
import { Router } from '@angular/router';
import { Route } from 'src/app/core/models/common';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { TOKEN } from '../../core/models/common/common.constants';

@Injectable()
export class AuthEffects {
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  userLogin$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromAuthActions.login),
      switchMap((request: LoginRequest) => {
        return this.authService.login(request).pipe(
          map((response: LoginResponse) => {
            return this.manageLoginSuccess(response);
          }),
          catchError((err: any) => {
            this.notificationService.error(err.error.message);
            return of(fromAuthActions.loginFailure());
          })
        );
      })
    )
  );

  private manageLoginSuccess(response: LoginResponse): TypedAction<string> {
    this.localStorage.setStorage({ TOKEN: response.token });
    const authState: AuthState = {
      isAuthenticated: true,
      isLoggingIn: false,
      user: {
        username: response.username,
        email: response.email,
        status: response.status,
        role: response.role,
      },
    };
    this.router.navigate([Route.COMPANY]);
    return fromAuthActions.loginSuccess(authState);
  }
}
