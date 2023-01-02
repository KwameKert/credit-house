import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSearchFieldComponent } from './customer-search-field.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('CustomerSearchFieldComponent', () => {
  let component: CustomerSearchFieldComponent;
  let fixture: ComponentFixture<CustomerSearchFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerSearchFieldComponent],
      providers: [
        provideMockStore({
          initialState: { isAuthenticated: false, isLoggingIn: false },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSearchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
