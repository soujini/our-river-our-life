import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsFloodWatchComponent } from './maps-flood-watch.component';

describe('MapsFloodWatchComponent', () => {
  let component: MapsFloodWatchComponent;
  let fixture: ComponentFixture<MapsFloodWatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsFloodWatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsFloodWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
