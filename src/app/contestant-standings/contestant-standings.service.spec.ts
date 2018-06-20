import { TestBed, inject } from '@angular/core/testing';

import { ContestantStandingsService } from './contestant-standings.service';

describe('ContestantStandingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContestantStandingsService]
    });
  });

  it('should be created', inject([ContestantStandingsService], (service: ContestantStandingsService) => {
    expect(service).toBeTruthy();
  }));
});
