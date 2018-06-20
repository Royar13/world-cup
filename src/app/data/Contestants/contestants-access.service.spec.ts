import { TestBed, inject } from '@angular/core/testing';
import { ContestantsAccessService } from './contestants-access.service';

describe('ContestantsService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ContestantsAccessService]
		});
	});

	it('should be created', inject([ContestantsAccessService], (service: ContestantsAccessService) => {
		expect(service).toBeTruthy();
	}));
});
