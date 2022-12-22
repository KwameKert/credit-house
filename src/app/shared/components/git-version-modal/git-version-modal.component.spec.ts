import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { GitVersionModalComponent } from './git-version-modal.component';

describe('GitVersionModalComponent', () => {
  let component: GitVersionModalComponent;
  let fixture: ComponentFixture<GitVersionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GitVersionModalComponent],
      imports: [MatDialogModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GitVersionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
