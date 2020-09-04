import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerWavesComponent } from './banner-waves.component';

describe('BannerWavesComponent', () => {
  let component: BannerWavesComponent;
  let fixture: ComponentFixture<BannerWavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerWavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerWavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
