import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionActionModalComponent } from './transaction-action-modal.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';

describe('TransactionActionModalComponent', () => {
  let component: TransactionActionModalComponent;
  let fixture: ComponentFixture<TransactionActionModalComponent>;

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
      declarations: [TransactionActionModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
