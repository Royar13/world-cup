import { Injectable } from '@angular/core';
import { Match } from '../data/WorldCupApi/Match';
import { GroupStageBet } from '../data/Bets/GroupStageBet';
import { WorldCupApiService } from '../data/WorldCupApi/world-cup-api.service';
import { CountriesApiService } from '../data/Countries/countries-api.service';
import { forkJoin } from 'rxjs';
import { Country } from '../data/Countries/Country';
import { Contestant } from '../data/Contestants/Contestant';
import { ContestantsApiService } from '../data/Contestants/contestants-api.service';
import { BetsApiService } from '../data/Bets/bets-api.service';

@Injectable({
	providedIn: 'root'
})
export class MatchesBetsService {
	private contestantId: number;
	public contestant: Contestant;
	public groupStageBets: GroupStageBet[];

	constructor(private worldCupApiService: WorldCupApiService, private countriesApiService: CountriesApiService, private contestantsApiService: ContestantsApiService,
		private betsApiService: BetsApiService) {

	}

	public init(contestantId: number): Promise<any> {
		this.contestantId = contestantId;
		return Promise.all([this.getContestant(), this.getGroupStageBets()]);
	}

	public getContestant(): Promise<Contestant> {
		let promise = new Promise<Contestant>((resolve, reject) => {
			this.contestantsApiService.getContestant(this.contestantId).subscribe(contestant => {
				this.contestant = contestant;
				resolve(this.contestant);
			}, reject);
		});
		return promise;
	}

	public getGroupStageBets(): Promise<GroupStageBet[]> {
		let promise = new Promise<GroupStageBet[]>((resolve, reject) => {
			let matchesObservable = this.worldCupApiService.getGroupStageMatches();
			let countriesObservable = this.countriesApiService.getCountries();
			let betsObservable = this.betsApiService.getGroupStageBets(this.contestantId);
			forkJoin(matchesObservable, countriesObservable, betsObservable).subscribe(results => {
				let matches: Match[] = results[0];
				let countries: Country[] = results[1];
				let bets: GroupStageBet[] = results[2];

				this.groupStageBets = matches.map((match): GroupStageBet => {
					let bet: GroupStageBet = bets.find(b => b.fifa_match_id === match.fifa_id);
					if (bet === undefined) {
						bet = new GroupStageBet();
						bet.fifa_match_id = match.fifa_id;
					}
					bet.match = match;

					let homeTeamCountry: Country = countries.find(c => c.fifa_code === match.home_team.code);
					if (homeTeamCountry !== undefined) {
						match.home_team.hebrewName = homeTeamCountry.hebrew_name;
					}
					let awayTeamCountry: Country = countries.find(c => c.fifa_code === match.away_team.code);
					if (awayTeamCountry !== undefined) {
						match.away_team.hebrewName = awayTeamCountry.hebrew_name;
					}
					return bet;
				});
				resolve(this.groupStageBets);
			}, reject);
		});
		return promise;
	}

	public saveGroupStageBets(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			let filledBets: GroupStageBet[] = this.getFilledBets();
			this.betsApiService.saveGroupStageBets(this.contestantId, filledBets).subscribe((response) => {
				if (response.success) {
					resolve();
				}
				else {
					reject(response.error);
				}
			}, () => {
				reject("ארעה שגיאה בשמירת הניחושים");
			});
		});
	}

	private getFilledBets(): GroupStageBet[] {
		return this.groupStageBets.filter(b => b.home_team_goals != null || b.away_team_goals != null);
	}
}
