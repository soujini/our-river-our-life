import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsFloraComponent } from './maps-flora.component';

describe('MapsFloraComponent', () => {
  let component: MapsFloraComponent;
  let fixture: ComponentFixture<MapsFloraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsFloraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsFloraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
