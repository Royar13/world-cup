import { TestBed, inject } from '@angular/core/testing';
import { ContestantsApiService } from './contestants-api.service';

describe('ContestantsService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ContestantsApiService]
		});
	});

	it('should be created', inject([ContestantsApiService], (service: ContestantsApiService) => {
		expect(service).toBeTruthy();
	}));
});
