import { Injectable, Inject } from '@angular/core';
import { Match } from './Match';
import { APP_CONFIG, IAppConfig } from '../AppConfig';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CountriesService } from '../Countries/countries.service';
import { Country } from '../Countries/Country';

@Injectable({
	providedIn: 'root'
})
export class WorldCupApiService {
	public matches: Match[] = new Array();
	private matchesPromise: Promise<Match[]> = null;

	constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig, private http: HttpClient, private countriesService: CountriesService) {

	}

	public getMatches(): Promise<Match[]> {
		if (this.matchesPromise === null) {
			let countriesPromise = this.countriesService.getCountries();
			let externalMatchesPromise = this.http.get(this.appConfig.worldCupApiUrl + "/matches").pipe(
				map((res: any[]): Match[] => {
					return res.map(m => Match.fromJSON(m));
				})).toPromise();

			this.matchesPromise = Promise.all([countriesPromise, externalMatchesPromise]).then((values): Match[] => {
				let countries: Country[] = values[0];
				let matches: Match[] = values[1];
				matches = matches.map(match => {
					let homeTeamCountry: Country = countries.find(c => c.fifa_code === match.home_team.code);
					if (typeof homeTeamCountry !== "undefined") {
						match.home_team.hebrewName = homeTeamCountry.hebrew_name;
					}
					let awayTeamCountry: Country = countries.find(c => c.fifa_code === match.away_team.code);
					if (typeof awayTeamCountry !== "undefined") {
						match.away_team.hebrewName = awayTeamCountry.hebrew_name;
					}
					return match;
				});
				return matches;
			});
			this.matchesPromise.then(matches => {
				this.matches = matches;
			});
		}
		return this.matchesPromise;
	}

	public filterScheduledMatches(): Match[] {
		return this.matches.filter(m => m.home_team.code !== "TBD" && m.away_team.code !== "TBD");
	}
}
