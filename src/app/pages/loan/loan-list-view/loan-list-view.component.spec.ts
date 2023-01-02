import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanListViewComponent } from './loan-list-view.component';
import { provideMockStore } from '@ngrx/store/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('LoanListViewComponent', () => {
  let component: LoanListViewComponent;
  let fixture: ComponentFixture<LoanListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [LoanListViewComponent],
      providers: [
        provideMockStore({
          initialState: { isAuthenticated: false, isLoggingIn: false },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
