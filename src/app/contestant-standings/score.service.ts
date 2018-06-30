import { Injectable } from '@angular/core';
import { Contestant } from '../data/Contestants/Contestant';
import { Bet } from '../data/Bets/Bet';
import { Match } from '../data/WorldCupApi/Match';
import { Stage } from '../data/WorldCupApi/Stage';

@Injectable({
	providedIn: 'root'
})
export class ScoreService {
	private stageModifier: Map<string, number> = new Map([
		[Stage.Groups, 1],
		[Stage.RoundOf16, 2],
		[Stage.QuarterFinals, 3],
		[Stage.SemiFinals, 4],
		[Stage.Final, 5],
		[Stage.ThirdPlace, 4]
	]);

	constructor() { }

	public calculatePreviousScore(bets: Bet[], cupWinnerBet: string, allMatches: Match[]): number {
		let numOfGamesAgo: number = 5;
		//get all the games before this match index
		let lastMatchIndex: number = allMatches.findIndex(m => m.status !== "completed");
		if (lastMatchIndex === undefined) {
			lastMatchIndex = allMatches.length;
		}
		lastMatchIndex = (lastMatchIndex >= numOfGamesAgo) ? lastMatchIndex - numOfGamesAgo : 0;
		let lastMatch: Match = allMatches[lastMatchIndex];
		let slicedBets: Bet[] = bets.filter(bet => bet.match.datetime < lastMatch.datetime);
		return this.calculateBetsScore(slicedBets, cupWinnerBet, allMatches);
	}

	public calculateBetsScore(bets: Bet[], cupWinnerBet: string, allMatches: Match[]): number {
		let score: number = 0;
		bets.forEach(bet => {
			if (bet.match.status === "completed") {
				if (bet.match.stage_name === Stage.Groups) {
					score += this.calculateGroupStageScore(bet);
				}
				else {
					score += this.calculateKnockoutStageScore(bet);
				}
			}
		});
		if (cupWinnerBet !== null) {
			//let reachedSemiFinals: boolean = allMatches.filter(m => m.stage_name === Stage.Final);
			let finalMatch: Match = allMatches.find(m => m.stage_name === Stage.Final);
			if (finalMatch !== undefined && finalMatch.hasCountry(cupWinnerBet)) {
				if (finalMatch.winner_code === cupWinnerBet) {
					score += 10;
				}
				else {
					score += 6;
				}
			}
			else {
				let thirdPlaceMatch: Match = allMatches.find(m => m.stage_name === Stage.ThirdPlace);
				if (thirdPlaceMatch !== undefined && thirdPlaceMatch.winner_code === cupWinnerBet) {
					score += 4;
				}
				else if (allMatches.some(m => m.stage_name === Stage.SemiFinals && m.hasCountry(cupWinnerBet))) {
					score += 2;
				}
			}
		}
		return score;
	}

	private calculateGroupStageScore(bet: Bet): number {
		let score = 0;
		if (bet.home_team_goals === bet.match.home_team.goals && bet.away_team_goals === bet.match.away_team.goals) {
			//correct guess
			score = 3;
		}
		else if (bet.home_team_goals - bet.away_team_goals === bet.match.home_team.goals - bet.match.away_team.goals) {
			//goal difference is correct
			if (bet.home_team_goals - bet.away_team_goals === 0) {
				//a draw is only worth 1 point
				score = 1;
			}
			else {
				score = 2;
			}
		}
		else if (Math.sign(bet.home_team_goals - bet.away_team_goals) === Math.sign(bet.match.home_team.goals - bet.match.away_team.goals)) {
			//winner/draw was guessed
			score = 1;
		}
		return score;
	}

	private calculateKnockoutStageScore(bet: Bet): number {
		let score = 0;
		if (bet.home_team_goals === bet.away_team_goals) {
			if (bet.match.home_team.goals === bet.match.away_team.goals) {
				//game reached penalties
				score += 1;
				if (bet.home_team_goals === bet.match.home_team.goals) {
					//the exact tied score after overtime was guessed
					score += 1
				}
				if (bet.winner_country_code === bet.match.winner_code) {
					//the winner of the penalties was guessed
					score += 1;
				}
			}
		}
		else {
			//in case of a non-drawn game, the score is calculated the same as the group stage
			score = this.calculateGroupStageScore(bet);
		}
		score *= this.stageModifier.get(bet.match.stage_name);
		return score;
	}
}
