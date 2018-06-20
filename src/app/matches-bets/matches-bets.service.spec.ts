import { TestBed, inject } from '@angular/core/testing';

import { MatchesBetsService } from './matches-bets.service';

describe('MatchesBetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchesBetsService]
    });
  });

  it('should be created', inject([MatchesBetsService], (service: MatchesBetsService) => {
    expect(service).toBeTruthy();
  }));
});
