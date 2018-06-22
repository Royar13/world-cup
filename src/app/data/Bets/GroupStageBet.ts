import { Match } from "../WorldCupApi/Match";

export class GroupStageBet {
	id: number;
	contestant_id: number;
	fifa_match_id: number;
	home_team_goals: number;
	away_team_goals: number;
	match: Match;
}