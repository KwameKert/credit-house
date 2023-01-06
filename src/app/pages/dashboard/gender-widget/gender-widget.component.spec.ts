import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderWidgetComponent } from './gender-widget.component';

describe('GenderWidgetComponent', () => {
  let component: GenderWidgetComponent;
  let fixture: ComponentFixture<GenderWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
