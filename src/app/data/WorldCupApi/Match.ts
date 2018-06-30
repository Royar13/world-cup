import { Team } from "./Team";

export class Match {
	public fifa_id: number;
	public stage_name: string;
	public status: string;
	public datetime: number;
	public home_team: Team;
	public away_team: Team;
	public winner_code: string;

	public static fromJSON(obj: any): Match {
		let match = new Match();
		Object.assign(match, obj);
		match.fifa_id = parseInt(<any>match.fifa_id);
		match.datetime = Date.parse(<any>match.datetime);
		match.home_team = Team.fromJSON(match.home_team);
		match.away_team = Team.fromJSON(match.away_team);
		return match;
	}
}