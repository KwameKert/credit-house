import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { ErrorInterceptor } from './error.interceptor';
import { NotificationService } from '../services/notification.service';

describe('ErrorInterceptor', () => {
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        ErrorInterceptor,
        provideMockStore({
          initialState: { isAuthenticated: false, isLoggingIn: false },
        }),
        {
          provide: NotificationService,
          useValue: notificationServiceSpy,
        },
      ],
    })
  );

  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
