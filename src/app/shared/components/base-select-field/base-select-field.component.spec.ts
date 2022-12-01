import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSelectFieldComponent } from './base-select-field.component';

describe('BaseSelectFieldComponent', () => {
  let component: BaseSelectFieldComponent;
  let fixture: ComponentFixture<BaseSelectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseSelectFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
