import { TestBed, inject } from '@angular/core/testing';

import { CountriesApiService } from './countries-api.service';

describe('CountriesService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CountriesApiService]
		});
	});

	it('should be created', inject([CountriesApiService], (service: CountriesApiService) => {
		expect(service).toBeTruthy();
	}));
});
