import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorWidgetComponent } from './sector-widget.component';

describe('SectorWidgetComponent', () => {
  let component: SectorWidgetComponent;
  let fixture: ComponentFixture<SectorWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectorWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
