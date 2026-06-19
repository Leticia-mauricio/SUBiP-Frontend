import { TestBed } from '@angular/core/testing';

import { ExemplarService } from './exemplar.service';

describe('ExemplarService', () => {
  let service: ExemplarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExemplarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
