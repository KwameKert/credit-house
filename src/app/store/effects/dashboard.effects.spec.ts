import { TestBed } from '@angular/core/testing';

import { DashboardEffects } from './dashboard.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { fromLoanSelectors } from '../selectors';

describe('DashboardEffects', () => {
  let effects: DashboardEffects;
  let action$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DashboardEffects,
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
      ],
    });
    effects = TestBed.inject(DashboardEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
