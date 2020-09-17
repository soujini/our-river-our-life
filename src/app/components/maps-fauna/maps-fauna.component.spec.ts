import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsFaunaComponent } from './maps-fauna.component';

describe('MapsFaunaComponent', () => {
  let component: MapsFaunaComponent;
  let fixture: ComponentFixture<MapsFaunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsFaunaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsFaunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
