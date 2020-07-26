import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosGalleryComponent } from './videos-gallery.component';

describe('VideosGalleryComponent', () => {
  let component: VideosGalleryComponent;
  let fixture: ComponentFixture<VideosGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});