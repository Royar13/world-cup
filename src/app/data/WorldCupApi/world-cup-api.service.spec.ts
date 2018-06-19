import { TestBed, inject } from '@angular/core/testing';

import { WorldCupApiService } from './world-cup-api.service';

describe('WorldCupAPiService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [WorldCupApiService]
		});
	});

	it('should be created', inject([WorldCupApiService], (service: WorldCupApiService) => {
		expect(service).toBeTruthy();
	}));
});
