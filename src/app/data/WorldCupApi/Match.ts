import { Team } from "./Team";
import { Stage } from "./Stage";

export class Match {
	public fifa_id: number;
	public stage_name: Stage;
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

	public hasCountry(code: string): boolean {
		return this.home_team.code === code || this.away_team.code === code;
	}
}