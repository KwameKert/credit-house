import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyActionModalComponent } from './company-action-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

describe('CompanyActionModalComponent', () => {
  let component: CompanyActionModalComponent;
  let fixture: ComponentFixture<CompanyActionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyActionModalComponent],
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
    fixture = TestBed.createComponent(CompanyActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
