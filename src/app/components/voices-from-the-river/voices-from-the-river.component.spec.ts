import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoicesFromTheRiverComponent } from './voices-from-the-river.component';

describe('VoicesFromTheRiverComponent', () => {
  let component: VoicesFromTheRiverComponent;
  let fixture: ComponentFixture<VoicesFromTheRiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoicesFromTheRiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoicesFromTheRiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
