import { Injectable, Inject } from '@angular/core';
import { Country } from './Country';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAppConfig, APP_CONFIG } from '../AppConfig';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class CountriesService {
	private countriesPromise: Promise<Country[]> = null;

	constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig, private http: HttpClient) {

	}

	public getCountries(): Promise<Country[]> {
		if (this.countriesPromise === null) {
			this.countriesPromise = this.http.get(this.appConfig.apiUrl + "/index.php?controller=Countries&action=getCountries").pipe(
				map((res: any[]): Country[] => {
					return res.map(m => Country.fromJSON(m));
				})).toPromise();
		}
		return this.countriesPromise;
	}
}
