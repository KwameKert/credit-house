import { TestBed } from '@angular/core/testing';

import { SettingEffects } from './setting.effects';
import { fromSettingSelectors } from '../selectors';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

describe('SettingEffects', () => {
  let effects: SettingEffects;
  let action$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SettingEffects,
        provideMockActions(() => action$),
        provideMockStore({
          initialState: { issues: [], issuesTotal: 10 },
          selectors: [
            {
              selector: fromSettingSelectors.selectIssues,
              value: {
                page: 0,
                size: 10,
              },
            },
          ],
        }),
      ],
    });
    effects = TestBed.inject(SettingEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
