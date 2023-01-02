import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransactionEffect } from './transaction.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { fromTransactionSelectors } from '../selectors';

describe('TransactionEffect', () => {
  let effect: TransactionEffect;
  let action$: Observable<any>;

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
      ],
    });
    effect = TestBed.inject(TransactionEffect);
  });

  it('should be created', () => {
    expect(effect).toBeTruthy();
  });
});
