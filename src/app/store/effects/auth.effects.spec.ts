import { TestBed } from '@angular/core/testing';
import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let effects: AuthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    effects = TestBed.inject(AuthEffects);
  });

  it('should be create an instance', () => {
    expect(effects).toBeTruthy();
  });
});
