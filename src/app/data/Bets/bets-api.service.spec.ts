import { TestBed, inject } from '@angular/core/testing';

import { BetsApiService } from './bets-api.service';

describe('BetsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BetsApiService]
    });
  });

  it('should be created', inject([BetsApiService], (service: BetsApiService) => {
    expect(service).toBeTruthy();
  }));
});
