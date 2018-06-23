import { Match } from "../WorldCupApi/Match";

export class GroupStageBet {
	id: number;
	contestant_id: number;
	fifa_match_id: number;
	home_team_goals: number;
	away_team_goals: number;
	match: Match;
	submitted: boolean = false;

	public static fromJSON(obj: any): GroupStageBet {
		let bet = new GroupStageBet();
		Object.assign(bet, obj);
		bet.fifa_match_id = parseInt(<any>bet.fifa_match_id);
		return bet;
	}
}