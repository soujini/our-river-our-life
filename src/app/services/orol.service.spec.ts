import { TestBed } from '@angular/core/testing';

import { OrolService } from './orol.service';

describe('OrolService', () => {
  let service: OrolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
