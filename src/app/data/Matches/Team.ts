export class Team {
	public country: string;
	public code: string;
	public goals: number;

	public static fromJSON(obj: any): Team {
		let team = new Team();
		return Object.assign(team, obj);
	}
}