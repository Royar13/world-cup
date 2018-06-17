import { TestBed, inject } from '@angular/core/testing';
import { ContestantsService } from './contestants.service';

describe('ContestantsService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ContestantsService]
		});
	});

	it('should be created', inject([ContestantsService], (service: ContestantsService) => {
		expect(service).toBeTruthy();
	}));
});
