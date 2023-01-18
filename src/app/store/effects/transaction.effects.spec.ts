import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransactionEffect } from './transaction.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { fromTransactionSelectors } from '../selectors';
import { NotificationService } from 'src/app/core/services/notification.service';

describe('TransactionEffect', () => {
  let effect: TransactionEffect;
  let action$: Observable<any>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      providers: [
        TransactionEffect,
        provideMockActions(() => action$),
        provideMockStore({
          initialState: { users: [], pagination: { page: 0, size: 10 } },
          selectors: [
            {
              selector: fromTransactionSelectors.selectTransactionPagination,
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
    effect = TestBed.inject(TransactionEffect);
  });

  it('should be created', () => {
    expect(effect).toBeTruthy();
  });
});
