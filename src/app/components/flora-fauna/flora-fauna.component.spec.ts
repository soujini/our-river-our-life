import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloraFaunaComponent } from './flora-fauna.component';

describe('FloraFaunaComponent', () => {
  let component: FloraFaunaComponent;
  let fixture: ComponentFixture<FloraFaunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloraFaunaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloraFaunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
