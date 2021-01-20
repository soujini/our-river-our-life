import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiverscapesComponent } from './riverscapes.component';

describe('RiverscapesComponent', () => {
  let component: RiverscapesComponent;
  let fixture: ComponentFixture<RiverscapesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiverscapesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiverscapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
