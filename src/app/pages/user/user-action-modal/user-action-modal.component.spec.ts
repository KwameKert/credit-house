import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionModalComponent } from './user-action-modal.component';

describe('UserActionModalComponent', () => {
  let component: UserActionModalComponent;
  let fixture: ComponentFixture<UserActionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActionModalComponent ]
    })
    .compileComponents();
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
