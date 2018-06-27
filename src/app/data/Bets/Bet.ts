import { Match } from "../WorldCupApi/Match";

export class Bet {
	id: number;
	contestant_id: number;
	fifa_match_id: number;
	home_team_goals: number;
	away_team_goals: number;
	match: Match;

	public static fromJSON(obj: any): Bet {
		let bet = new Bet();
		Object.assign(bet, obj);
		bet.contestant_id = parseInt(<any>bet.contestant_id);
		bet.fifa_match_id = parseInt(<any>bet.fifa_match_id);
		bet.home_team_goals = parseInt(<any>bet.home_team_goals);
		bet.away_team_goals = parseInt(<any>bet.away_team_goals);
		return bet;
	}

	public isFilled(): boolean {
		return this.home_team_goals != null && this.away_team_goals != null;
	}
}