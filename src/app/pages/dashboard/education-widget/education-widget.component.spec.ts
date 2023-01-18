import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationWidgetComponent } from './education-widget.component';

describe('EducationWidgetComponent', () => {
  let component: EducationWidgetComponent;
  let fixture: ComponentFixture<EducationWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
