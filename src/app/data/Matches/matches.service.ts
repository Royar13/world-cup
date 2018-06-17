import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from './Match';
import { APP_CONFIG, IAppConfig } from '../AppConfig';
import { HttpClient } from '@angular/common/http';
import { map, refCount, publishReplay } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class MatchesService {
	private matches: Observable<Match[]> = null;

	constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig, private http: HttpClient) {

	}

	public getMatches(): Observable<Match[]> {
		if (this.matches === null) {
			this.matches = this.http.get(this.appConfig.worldCupApiUrl + "/matches").pipe(
				map((res: any[]): Match[] => {
					return res.map(m => Match.fromJSON(m));
				}),
				publishReplay(),
				refCount());
		}
		return this.matches;
	}

	public getScheduledMatches(): Observable<Match[]> {
		this.getMatches().subscribe();
		return this.getMatches().pipe(map(matches => matches.filter(m => m.home_team.code !== "TBD" && m.away_team.code !== "TBD")));
	}
}