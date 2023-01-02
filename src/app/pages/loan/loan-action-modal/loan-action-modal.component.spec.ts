import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanActionModalComponent } from './loan-action-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';

describe('LoanActionModalComponent', () => {
  let component: LoanActionModalComponent;
  let fixture: ComponentFixture<LoanActionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, ReactiveFormsModule, FormsModule],
      providers: [
        provideMockStore({
          initialState: { isAuthenticated: false, isLoggingIn: false },
        }),
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      declarations: [LoanActionModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
