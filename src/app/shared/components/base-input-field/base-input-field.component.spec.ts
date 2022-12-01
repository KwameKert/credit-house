import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseInputFieldComponent } from './base-input-field.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('BaseInputFieldComponent', () => {
  let component: BaseInputFieldComponent;
  let fixture: ComponentFixture<BaseInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseInputFieldComponent],
      imports: [MatAutocompleteModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
