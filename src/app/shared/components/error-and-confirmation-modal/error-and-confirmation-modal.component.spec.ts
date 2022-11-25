import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorAndConfirmationModalComponent } from './error-and-confirmation-modal.component';

describe('ErrorAndConfirmationModalComponent', () => {
  let component: ErrorAndConfirmationModalComponent;
  let fixture: ComponentFixture<ErrorAndConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorAndConfirmationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorAndConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
