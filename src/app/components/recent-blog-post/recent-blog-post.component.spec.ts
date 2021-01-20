import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentBlogPostComponent } from './recent-blog-post.component';

describe('RecentBlogPostComponent', () => {
  let component: RecentBlogPostComponent;
  let fixture: ComponentFixture<RecentBlogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentBlogPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
