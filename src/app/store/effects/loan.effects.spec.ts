import { TestBed } from '@angular/core/testing';

import { LoanEffects } from './loan.effects';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { fromLoanSelectors } from '../selectors';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from 'src/app/core/services/notification.service';

describe('LoanService', () => {
  let effects: LoanEffects;
  let action$: Observable<any>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoanEffects,
        provideMockActions(() => action$),
        provideMockStore({
          initialState: { users: [], pagination: { page: 0, size: 10 } },
          selectors: [
            {
              selector: fromLoanSelectors.selectLoanPagination,
              value: {
                page: 0,
                size: 10,
              },
            },
          ],
        }),
        {
          provide: NotificationService,
          useValue: notificationServiceSpy,
        },
      ],
    });
    effects = TestBed.inject(LoanEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
