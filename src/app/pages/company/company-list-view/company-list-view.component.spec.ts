import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListViewComponent } from './company-list-view.component';
import { provideMockStore } from '@ngrx/store/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('CompanyListViewComponent', () => {
  let component: CompanyListViewComponent;
  let fixture: ComponentFixture<CompanyListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyListViewComponent],
      imports: [MatDialogModule],
      providers: [
        provideMockStore({
          initialState: { isAuthenticated: false, isLoggingIn: false },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
