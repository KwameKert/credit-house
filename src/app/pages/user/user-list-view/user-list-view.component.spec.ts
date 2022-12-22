import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { UserListViewComponent } from './user-list-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UserListViewComponent', () => {
  let component: UserListViewComponent;
  let fixture: ComponentFixture<UserListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListViewComponent],
      imports: [MatDialogModule, ReactiveFormsModule, FormsModule],
      providers: [
        provideMockStore({
          initialState: { isAuthenticated: false, isLoggingIn: false },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
