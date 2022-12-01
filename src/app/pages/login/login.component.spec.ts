import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Store, StoreModule } from '@ngrx/store';
import { RootState } from 'src/app/store/models/root.model';
import { reducers } from 'src/app/store/reducers';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store<RootState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'subscribe').and.callThrough();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have store defined', () => {
    expect(store).toBeDefined();
  });

  it('should call loginEvent', () => {
    const loginParams = { username: 'user', password: 'password' };
    component.loginEvent(loginParams);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
