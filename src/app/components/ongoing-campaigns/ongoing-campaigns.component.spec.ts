import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingCampaignsComponent } from './ongoing-campaigns.component';

describe('OngoingCampaignsComponent', () => {
  let component: OngoingCampaignsComponent;
  let fixture: ComponentFixture<OngoingCampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingCampaignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
