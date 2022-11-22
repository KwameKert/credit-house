import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanListViewComponent } from './loan-list-view.component';

describe('LoanListViewComponent', () => {
  let component: LoanListViewComponent;
  let fixture: ComponentFixture<LoanListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanListViewComponent ]
    })
    .compileComponents();
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
