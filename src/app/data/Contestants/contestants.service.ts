import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Contestant } from './Contestant';
import { APP_CONFIG, IAppConfig } from '../AppConfig';


@Injectable({
	providedIn: 'root'
})
export class ContestantsService {
	constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig, private http: HttpClient) {

	}

	public getContestants(): Observable<Contestant[]> {
		return this.http.get(this.appConfig.apiUrl + "/getContestants").pipe(
			map((res): Contestant[] => {
				return null;
			}));
	}
}
