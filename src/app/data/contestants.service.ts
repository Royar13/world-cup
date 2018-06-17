import { Injectable, Inject } from '@angular/core';
import { Contestant } from '../data/Contestant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { shareReplay, refCount, map } from 'rxjs/operators';
import { IAppConfig, APP_CONFIG } from './AppConfig';


@Injectable({
	providedIn: 'root'
})
export class ContestantsService {
	private contestants: Observable<Contestant[]> = null;

	constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig, private http: HttpClient) {

	}

	public getContestants(): Observable<Contestant[]> {
		if (this.contestants === null) {
			this.contestants = this.http.get(this.appConfig + "/server/getContestants").pipe(
				map((res): Contestant[] => {
					return null;
				}),
				shareReplay(),
				refCount());
		}
		return this.contestants;
	}
}
