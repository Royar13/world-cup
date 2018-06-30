import { Injectable } from '@angular/core';
import { Match } from '../data/WorldCupApi/Match';
import { Bet } from '../data/Bets/Bet';
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
	public originalBets: Bet[] = new Array();
	public bets: Bet[] = new Array();

	constructor(private worldCupApiService: WorldCupApiService, private countriesApiService: CountriesApiService, private contestantsApiService: ContestantsApiService,
		private betsApiService: BetsApiService) {

	}

	public init(contestantId: number): Promise<any> {
		this.contestantId = contestantId;
		return Promise.all([this.getContestant(), this.getBets()]);
	}

	private getContestant(): Promise<Contestant> {
		let promise = new Promise<Contestant>((resolve, reject) => {
			this.contestantsApiService.getContestant(this.contestantId).subscribe(contestant => {
				this.contestant = contestant;
				resolve(this.contestant);
			}, reject);
		});
		return promise;
	}

	private getBets(): Promise<Bet[]> {
		let promise = new Promise<Bet[]>((resolve, reject) => {
			let matchesObservable = this.worldCupApiService.getGroupStageMatches();
			let countriesObservable = this.countriesApiService.getCountries();
			let betsObservable = this.betsApiService.getBetsContestant(this.contestantId);
			forkJoin(matchesObservable, countriesObservable, betsObservable).subscribe(results => {
				let matches: Match[] = results[0];
				let countries: Country[] = results[1];
				let bets: Bet[] = results[2];

				this.bets = matches.map((match): Bet => {
					let bet: Bet = bets.find(b => b.fifa_match_id === match.fifa_id);
					if (bet === undefined) {
						bet = new Bet();
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
				this.updateOriginalBets();
				resolve(this.bets);
			}, reject);
		});
		return promise;
	}

	private updateOriginalBets(): void {
		this.originalBets = this.bets.map(b => {
			let bet = new Bet();
			Object.assign(bet, b);
			return bet;
		});
	}

	public saveBets(saveBets: Bet[]): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			let filledBets: Bet[] = saveBets.filter(b => b.isFilled());
			this.betsApiService.saveBets(this.contestantId, filledBets).subscribe((response) => {
				if (response.success) {
					this.updateOriginalBets();
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

	public hasChanged(): boolean {
		let changed: boolean = false;
		for (let i = 0; i < this.bets.length && !changed; i++) {
			let bet = this.bets[i];
			let originalBet = this.originalBets[i];
			if (bet.home_team_goals !== originalBet.home_team_goals ||
				bet.away_team_goals !== originalBet.away_team_goals ||
				bet.winner_country_code !== originalBet.winner_country_code) {
				changed = true;
			}
		}
		return changed;
	}
}
