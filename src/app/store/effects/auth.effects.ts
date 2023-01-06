import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of, pipe } from 'rxjs';
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
import { TOKEN } from 'src/app/core/models/common/common.constants';
import { MatDialog } from '@angular/material/dialog';
import {
  ErrorAndConfirmationModalComponent,
  ModalType,
} from 'src/app/shared/components/error-and-confirmation-modal/error-and-confirmation-modal.component';
import { ErrorAndConfirmDataModel } from 'src/app/shared/components/error-and-confirmation-modal/modal-content.model';

@Injectable()
export class AuthEffects {
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
    private notificationService: NotificationService,
    private dialog: MatDialog
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

  userLogout$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(fromAuthActions.logout),
      pipe(
        map(() => {
          return this.manageLogout();
        })
      )
    );
  });

  userForceLogout$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(fromAuthActions.forceLogout),
      pipe(
        map(() => {
          return this.manageLogout(true);
        })
      )
    );
  });

  private manageLoginSuccess(response: LoginResponse): TypedAction<string> {
    this.localStorage.setStorage({ [TOKEN]: response.token });
    const authState: AuthState = {
      isAuthenticated: true,
      isLoggingIn: false,
      user: response.user,
    };
    this.router.navigate([Route.DASHBOARD]);
    return fromAuthActions.loginSuccess(authState);
  }

  private manageLogout(forceLogout = false): TypedAction<string> {
    this.localStorage.deleteStorage();
    if (forceLogout) {
      this.showExpirationTokenModal();
    }

    this.router.navigate([Route.LOGIN]);
    return fromAuthActions.logoutSuccess();
  }

  private showExpirationTokenModal() {
    const expiration: ErrorAndConfirmDataModel = {
      message: 'Unauthorized',
      description: 'You are being redirected to the login page',
      modalType: ModalType.Error,
    };
    this.dialog.open(ErrorAndConfirmationModalComponent, {
      data: expiration,
      width: '560px',
    });
  }
}
