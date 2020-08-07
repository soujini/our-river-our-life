import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiverMonitoringComponent } from './river-monitoring.component';

describe('RiverMonitoringComponent', () => {
  let component: RiverMonitoringComponent;
  let fixture: ComponentFixture<RiverMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiverMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiverMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
