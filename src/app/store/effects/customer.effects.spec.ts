import { TestBed } from '@angular/core/testing';

import { CustomerEffects } from './customer.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('CustomerEffects', () => {
  let service: CustomerEffects;
  let action$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CustomerEffects,
        provideMockActions(() => action$),
        provideMockStore({
          initialState: { users: [] },
        }),
      ],
    });
    service = TestBed.inject(CustomerEffects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
