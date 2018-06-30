import { Injectable, Inject } from '@angular/core';
import { Match } from './Match';
import { APP_CONFIG, IAppConfig } from '../AppConfig';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Country } from '../Countries/Country';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class WorldCupApiService {
	private matches: Observable<Match[]> = null;

	constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig, private http: HttpClient) {

	}

	public getMatches(): Observable<Match[]> {
		if (this.matches === null) {
			this.matches = this.http.get(this.appConfig.worldCupApiUrl + "/matches").pipe(
				map((res: any[]): Match[] => {
					return res.map(m => Match.fromJSON(m));
				}), shareReplay(1));

		}
		return this.matches;
	}

	public getDeterminedMatches(): Observable<Match[]> {
		return this.getMatches().pipe(
			map(matches => matches.filter(m => m.home_team.code !== "TBD" && m.away_team.code !== "TBD"))
		);
	}
}
