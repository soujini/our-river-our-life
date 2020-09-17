import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsRiverMonitoringComponent } from './maps-river-monitoring.component';

describe('MapsRiverMonitoringComponent', () => {
  let component: MapsRiverMonitoringComponent;
  let fixture: ComponentFixture<MapsRiverMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsRiverMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsRiverMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
