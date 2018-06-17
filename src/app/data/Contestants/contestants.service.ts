import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { refCount, map, publishReplay } from 'rxjs/operators';
import { Contestant } from './Contestant';
import { APP_CONFIG, IAppConfig } from '../AppConfig';


@Injectable({
	providedIn: 'root'
})
export class ContestantsService {
	private contestants: Observable<Contestant[]> = null;

	constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig, private http: HttpClient) {

	}

	public getContestants(): Observable<Contestant[]> {
		if (this.contestants === null) {
			this.contestants = this.http.get(this.appConfig.baseUrl + "/server/getContestants").pipe(
				map((res): Contestant[] => {
					return null;
				}),
				publishReplay(),
				refCount());
		}
		return this.contestants;
	}
}