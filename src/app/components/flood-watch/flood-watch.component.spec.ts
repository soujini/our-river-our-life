import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloodWatchComponent } from './flood-watch.component';

describe('FloodWatchComponent', () => {
  let component: FloodWatchComponent;
  let fixture: ComponentFixture<FloodWatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloodWatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloodWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
