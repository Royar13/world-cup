import { TestBed, inject } from '@angular/core/testing';

import { CountriesAccessService } from './countries-access.service';

describe('CountriesService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CountriesAccessService]
		});
	});

	it('should be created', inject([CountriesAccessService], (service: CountriesAccessService) => {
		expect(service).toBeTruthy();
	}));
});
