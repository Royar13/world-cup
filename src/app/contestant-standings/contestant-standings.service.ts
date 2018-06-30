import { Injectable } from '@angular/core';
import { ContestantsApiService } from '../data/Contestants/contestants-api.service';
import { Contestant } from '../data/Contestants/Contestant';
import { BetsApiService } from '../data/Bets/bets-api.service';
import { forkJoin } from 'rxjs';
import { Bet } from '../data/Bets/Bet';
import { WorldCupApiService } from '../data/WorldCupApi/world-cup-api.service';
import { Match } from '../data/WorldCupApi/Match';
import { ScoreService } from './score.service';

@Injectable({
	providedIn: 'root'
})
export class ContestantStandingsService {
	private contestants: Contestant[] = new Array();
	private matches: Match[];
	public contestantsStandings: Contestant[] = new Array();

	constructor(private contestansApiService: ContestantsApiService, private betsApiService: BetsApiService, private worldCupApiService: WorldCupApiService,
		private scoreService: ScoreService) {

	}

	public init(): Promise<any> {
		return this.getContestants();
	}

	private getContestants(): Promise<Contestant[]> {
		let promise = new Promise<Contestant[]>((resolve, reject) => {
			let contestantsObservable = this.contestansApiService.getContestants();
			let betsObservable = this.betsApiService.getBets();
			let matchesObservable = this.worldCupApiService.getDeterminedMatches();

			forkJoin(contestantsObservable, betsObservable, matchesObservable).subscribe(results => {
				let contestants: Contestant[] = results[0];
				let bets: Bet[] = results[1];
				this.matches = results[2];
				bets.forEach(bet => {
					bet.match = this.matches.find(m => m.fifa_id === bet.fifa_match_id);
				});

				this.contestants = contestants
					.map((contestant): Contestant => {
						contestant.bets = bets.filter(b => b.contestant_id === contestant.id);
						contestant.score = this.scoreService.calculateBetsScore(contestant.bets, contestant.winner_bet_country_code, this.matches);
						contestant.previousScore = this.scoreService.calculatePreviousScore(contestant.bets, contestant.winner_bet_country_code, this.matches);
						return contestant;
					});

				this.calculateStandings();
				resolve(this.contestantsStandings);
			}, reject);
		});
		return promise;
	}

	public saveContestant(name: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.contestansApiService.createContestant(name).subscribe(response => {
				if (response.success) {
					let newContestant: Contestant = new Contestant(response.id, name);
					this.contestants.push(newContestant);
					this.calculateStandings();
					resolve();
				}
				else {
					reject(response.error);
				}
			}, () => {
				reject("ארעה שגיאה בשמירת המתחרה");
			});
		});
	}

	public deleteContestant(contestant: Contestant): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.contestansApiService.deleteContestant(contestant.id).subscribe(() => {
				this.contestants = this.contestants.filter(c => c !== contestant);
				this.calculateStandings();
				resolve();
			}, () => {
				reject();
			});
		});
	}

	private compareContestants(a: Contestant, b: Contestant): number {
		if (b.score > a.score) {
			return 1;
		}
		else if (b.score < a.score) {
			return -1;
		}
		else {
			return (b.id < a.id) ? 1 : -1;
		}
	}

	private compareContestantsPreviousScores(a: Contestant, b: Contestant): number {
		if (b.previousScore > a.previousScore) {
			return 1;
		}
		else if (b.previousScore < a.previousScore) {
			return -1;
		}
		else {
			return (b.id < a.id) ? 1 : -1;
		}
	}

	private calculateStandings(): void {
		this.calculateContestantsStandings();
		this.calculateContestantsPreviousStandings();
	}

	private calculateContestantsStandings(): void {
		this.contestantsStandings = this.contestants.slice().sort(this.compareContestants);
		let rank = 1;
		this.contestantsStandings.forEach((contestant, index) => {
			if (index > 0 && contestant.score < this.contestantsStandings[index - 1].score) {
				rank = index + 1;
			}
			contestant.rank = rank;
		});
	}

	private calculateContestantsPreviousStandings(): void {
		let contestants = this.contestants.slice().sort(this.compareContestantsPreviousScores);
		let previousRank = 1;
		contestants.forEach((contestant, index) => {
			if (index > 0 && contestant.previousScore < contestants[index - 1].previousScore) {
				previousRank = index + 1;
			}
			contestant.previousRank = previousRank;
		});
	}


	public hasAllBets(contestant: Contestant): boolean {
		return contestant.bets.length === this.matches.length;
	}
}
