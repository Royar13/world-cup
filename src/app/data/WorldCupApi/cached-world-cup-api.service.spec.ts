import { TestBed, inject } from '@angular/core/testing';

import { CachedWorldCupApiService } from './cached-world-cup-api.service';

describe('CachedWorldCupApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CachedWorldCupApiService]
    });
  });

  it('should be created', inject([CachedWorldCupApiService], (service: CachedWorldCupApiService) => {
    expect(service).toBeTruthy();
  }));
});
