import { Injectable, Inject } from '@angular/core';
import { Match } from './Match';
import { APP_CONFIG, IAppConfig } from '../AppConfig';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

export abstract class WorldCupApi {
	protected matches: Observable<Match[]> = null;
	protected abstract get matchesUrl(): string;

	constructor(protected http: HttpClient) {
	}

	public getMatches(): Observable<Match[]> {
		if (this.matches === null) {
			this.matches = this.http.get(this.matchesUrl).pipe(
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

@Injectable()
export class WorldCupApiService extends WorldCupApi {
	protected get matchesUrl(): string {
		return this.appConfig.worldCupApiUrl + "/matches";
	}

	constructor(http: HttpClient, @Inject(APP_CONFIG) private appConfig: IAppConfig) {
		super(http);
	}
}
