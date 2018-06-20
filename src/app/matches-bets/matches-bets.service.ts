import { Injectable } from '@angular/core';
import { Match } from '../data/WorldCupApi/Match';
import { GroupStageBet } from '../data/Bets/GroupStageBet';
import { WorldCupApiService } from '../data/WorldCupApi/world-cup-api.service';
import { CountriesService } from '../data/Countries/countries.service';
import { forkJoin } from 'rxjs';
import { Country } from '../data/Countries/Country';
import { reject } from 'q';

@Injectable({
	providedIn: 'root'
})
export class MatchesBetsService {
	public groupStageBets: GroupStageBet[];

	constructor(private worldCupApiService: WorldCupApiService, private countriesService: CountriesService) {

	}

	public getGroupStageBets(): Promise<GroupStageBet[]> {
		let promise = new Promise<GroupStageBet[]>((resolve, reject) => {
			let matchesObservable = this.worldCupApiService.getGroupStageMatches();
			let countriesObservable = this.countriesService.getCountries();
			forkJoin(matchesObservable, countriesObservable).subscribe(results => {
				let matches: Match[] = results[0];
				let countries: Country[] = results[1];

				this.groupStageBets = matches.map((match): GroupStageBet => {
					let homeTeamCountry: Country = countries.find(c => c.fifa_code === match.home_team.code);
					if (typeof homeTeamCountry !== "undefined") {
						match.home_team.hebrewName = homeTeamCountry.hebrew_name;
					}
					let awayTeamCountry: Country = countries.find(c => c.fifa_code === match.away_team.code);
					if (typeof awayTeamCountry !== "undefined") {
						match.away_team.hebrewName = awayTeamCountry.hebrew_name;
					}
					let bet = new GroupStageBet();
					bet.fifa_match_id = match.fifa_id;
					bet.match = match;
					return bet;
				});
				resolve(this.groupStageBets);
			}, reject);
		});
		return promise;
	}
}
