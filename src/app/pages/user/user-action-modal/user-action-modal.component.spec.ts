import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UserActionModalComponent } from './user-action-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UserActionModalComponent', () => {
  let component: UserActionModalComponent;
  let fixture: ComponentFixture<UserActionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserActionModalComponent],
      imports: [MatDialogModule, ReactiveFormsModule, FormsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
