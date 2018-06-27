import { Injectable } from '@angular/core';
import { ContestantsApiService } from '../data/Contestants/contestants-api.service';
import { Contestant } from '../data/Contestants/Contestant';
import { BetsApiService } from '../data/Bets/bets-api.service';
import { forkJoin } from 'rxjs';
import { Bet } from '../data/Bets/Bet';
import { WorldCupApiService } from '../data/WorldCupApi/world-cup-api.service';
import { Match } from '../data/WorldCupApi/Match';

@Injectable({
	providedIn: 'root'
})
export class ContestantStandingsService {
	private contestants: Contestant[] = new Array();
	private matches: Match[];
	public contestantsStandings: Contestant[] = new Array();

	constructor(private contestansApiService: ContestantsApiService, private betsApiService: BetsApiService, private worldCupApiService: WorldCupApiService) {

	}

	public init(): Promise<any> {
		return this.getContestants();
	}

	private getContestants(): Promise<Contestant[]> {
		let promise = new Promise<Contestant[]>((resolve, reject) => {
			let contestantsObservable = this.contestansApiService.getContestants();
			let betsObservable = this.betsApiService.getBets();
			let matchesObservable = this.worldCupApiService.getGroupStageMatches();

			forkJoin(contestantsObservable, betsObservable, matchesObservable).subscribe(results => {
				let contestants: Contestant[] = results[0];
				let bets: Bet[] = results[1];
				this.matches = results[2];
				bets.forEach(bet => {
					bet.match = this.matches.find(m => m.fifa_id === bet.fifa_match_id);
				});

				this.contestants = contestants
					.map((contestant): Contestant => {
						contestant.groupStageBets = bets.filter(b => b.contestant_id === contestant.id);
						contestant.score = this.calculateScore(contestant);
						contestant.previousScore = this.calculatePreviousScore(contestant);
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

	private calculatesBetsScore(groupStageBets: Bet[]): number {
		let score: number = 0;
		groupStageBets.forEach(bet => {
			if (bet.match.status === "completed") {
				if (bet.home_team_goals === bet.match.home_team.goals && bet.away_team_goals === bet.match.away_team.goals) {
					//correct guess
					score += 3;
				}
				else if (bet.home_team_goals - bet.away_team_goals === bet.match.home_team.goals - bet.match.away_team.goals) {
					//goal difference is correct
					if (bet.home_team_goals - bet.away_team_goals === 0) {
						//a draw is only worth 1 point
						score += 1;
					}
					else {
						score += 2;
					}
				}
				else if (Math.sign(bet.home_team_goals - bet.away_team_goals) === Math.sign(bet.match.home_team.goals - bet.match.away_team.goals)) {
					//winner/draw was guessed
					score += 1;
				}
			}
		});
		return score;
	}

	private calculateScore(contestant: Contestant): number {
		return this.calculatesBetsScore(contestant.groupStageBets);
	}

	private calculatePreviousScore(contestant: Contestant): number {
		let numOfGamesAgo: number = 5;
		//get all the games before this match index
		let lastMatchIndex: number = this.matches.findIndex(m => m.status !== "completed");
		if (lastMatchIndex === undefined) {
			lastMatchIndex = this.matches.length;
		}
		lastMatchIndex = (lastMatchIndex >= numOfGamesAgo) ? lastMatchIndex - numOfGamesAgo : 0;
		let lastMatch: Match = this.matches[lastMatchIndex];
		let slicedBets: Bet[] = contestant.groupStageBets.filter(bet => bet.match.datetime < lastMatch.datetime);
		return this.calculatesBetsScore(slicedBets);
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
}
