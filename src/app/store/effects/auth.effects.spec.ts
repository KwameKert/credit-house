import { TestBed } from '@angular/core/testing';
import { AuthEffects } from './auth.effects';
import { isEmpty, Observable, of } from 'rxjs';
import { AuthState } from '../models/auth.model';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NotificationService } from '../../core/services/notification.service';
import { SpyTestUtils } from '../../shared/test-utils/spy-test-utils.spec';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fromAuthActions } from '../actions';
import { LoginResponse } from 'src/app/core/models/authentication/auth.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const loginResponse: LoginResponse = {
  user: {
    id: '2342342',
    fullName: 'kwame',
    email: 'kwame@gmail.com',
    role: 1,
  },
  token: 'werwerwerwerwerwerw',
};
describe('AuthEffects', () => {
  const url: string = `${environment.baseApi}/auth/login`;

  let action$: Observable<any>;
  let router: Router;
  let httpController: HttpTestingController;
  let effects: AuthEffects;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    notificationServiceSpy = SpyTestUtils.createNotificationSpy();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        [
          AuthEffects,
          provideMockStore({
            initialState: { isAuthenticated: false, isLoggingIn: false },
          }),
          provideMockActions(() => action$),
          {
            provide: NotificationService,
            useValue: notificationServiceSpy,
          },
        ],
      ],
    });
    effects = TestBed.inject(AuthEffects);
    httpController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    notificationServiceSpy = TestBed.inject(
      NotificationService
    ) as jasmine.SpyObj<NotificationService>;
    spyOn(router, 'navigate').and.callFake(() => Promise.resolve(true));
  });

  it('should be create an instance', () => {
    expect(effects).toBeTruthy();
  });

  describe('userLogin$', () => {
    it('should fire a login and get a success', (done) => {
      action$ = of(fromAuthActions.login);
      effects.userLogin$.subscribe((result: any) => {
        expect(result).toEqual(
          fromAuthActions.loginSuccess(getEffectResponse())
        );
      });

      mockBackEndLoginSuccess();
      done();
    });

    it('should fire a login and get a fail', (done) => {
      action$ = of(fromAuthActions.login);
      effects.userLogin$.pipe(isEmpty()).subscribe((isErrorThrown: any) => {
        console.log(isErrorThrown);
        expect(notificationServiceSpy.error).toHaveBeenCalled();
      });

      mockBackEndLoginFailed();
      done();
    });
  });

  //describe test for logout: 1 check if router is called and action is dispatched

  function getEffectResponse(): AuthState {
    const authState: AuthState = {
      isAuthenticated: true,
      isLoggingIn: false,
      user: loginResponse.user,
    };
    return authState;
  }

  function mockBackEndLoginSuccess() {
    httpController.expectOne({ method: 'POST', url }).flush(loginResponse);
  }

  function mockBackEndLoginFailed() {
    httpController.expectOne({ method: 'POST', url }).flush(
      { message: 'invalid username or password' },
      {
        status: 400,
        statusText: 'Bad request',
      }
    );
  }
});
