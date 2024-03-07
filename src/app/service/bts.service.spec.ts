import { TestBed } from '@angular/core/testing';

import { BtsService } from './bts.service';

describe('BtsService', () => {
  let service: BtsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BtsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
